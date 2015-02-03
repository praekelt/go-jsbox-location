var assert = require('assert');
var _ = require('lodash');

var fixtures = require('../fixtures');

var vumigo = require('vumigo_v02');
var JsonApi = vumigo.http.api.JsonApi;
var test_utils = vumigo.test_utils;

var providers = require('../../lib/providers');
var Provider = providers.Provider;
var AddressResult = providers.AddressResult;
var OpenStreetMap = providers.OpenStreetMap;

var loc_test_utils = require('../../lib/test_utils');
var assert_address_result = loc_test_utils.assert_address_result;


describe('OpenStreetMap', function() {
    it('should extend Provider', function() {
        var osm = new OpenStreetMap();
        assert(osm instanceof Provider);
    });

    describe('.init()', function() {
        it('should create a JsonApi', function() {
            var osm = new OpenStreetMap();
            var dummy_im = {};
            assert.strictEqual(osm.http, null);
            osm.init(dummy_im);
            assert(osm.http instanceof JsonApi);
        });
    });

    describe('extract_address_label', function() {
        it('the default should return display_name', function() {
            var osm = new OpenStreetMap();
            var label = osm.extract_address_label({
                display_name: 'the label',
                other: 'something entirely different',
            });
            assert.strictEqual(label, 'the label');
        });

        it('should be overrideable', function() {
            var osm = new OpenStreetMap({
                extract_address_label: function(r) {
                    return r.custom_label;
                },
            });
            var label = osm.extract_address_label({
                display_name: 'the ordinary label',
                custom_label: 'customised label',
            });
            assert.strictEqual(label, 'customised label');
        });
    });

    describe('extract_address_data', function() {
        it('the default should return display name as formatted_address', function() {
            var osm = new OpenStreetMap();
            var data = osm.extract_address_data({
                display_name: 'the address',
                other: 'something entirely different',
            });
            assert.deepEqual(data, {formatted_address: 'the address'});
        });

        it('should be overrideable', function() {
            var osm = new OpenStreetMap({
                extract_address_data: function(r) {
                    return {custom: r.custom_data};
                },
            });
            var data = osm.extract_address_data({
                display_name: 'the address',
                custom_data: 'customised data',
            });
            assert.deepEqual(data, {custom: 'customised data'});
        });
    });

    describe('extract_address', function() {
        it('should have a default', function() {
            var osm = new OpenStreetMap();
            var addr = osm.extract_address({
                display_name: 'the address',
                extraneous_field: 'extraneous value',
            });
            assert(addr instanceof AddressResult);
            assert.strictEqual(addr.label, 'the address');
            assert.deepEqual(addr.data, {formatted_address: 'the address'});
        });

        describe('should respect overrides of', function() {
            it('extract_address_label', function() {
                var osm = new OpenStreetMap({
                    extract_address_label: function(r) {
                        return r.override;
                    },
                });
                var addr = osm.extract_address({
                    display_name: 'the address',
                    override: 'max override',
                });
                assert.strictEqual(addr.label, 'max override');
            });

            it('extract_address_data', function() {
                var osm = new OpenStreetMap({
                    extract_address_data: function(r) {
                        return {custom: r.snowflake};
                    },
                });
                var addr = osm.extract_address({
                    display_name: 'the address',
                    snowflake: 'unique',
                });
                assert.deepEqual(addr.data, {custom: 'unique'});
            });
        });
    });

    describe('.api_params()', function() {
        var default_query = 'generic query';

        function api_params(opts, query) {
            var osm = new OpenStreetMap(opts);
            return osm.api_params(query || default_query);
        }

        function assert_params(params, expected) {
            expected = _.defaults(expected, {
                format: 'json',
                q: default_query,
                addressdetails: 1,
                bounded: 1,
                limit: 30,
                viewbox: "viewbox=-180.0%2C90.0%2C180.0%2C-90.0",
            });
            assert.deepEqual(params, expected);
        }

        it('should set the query text', function() {
            var params = api_params(null, 'my search');
            assert_params(params, {
                q: 'my search',
            });
        });

        it('should set the format to json', function() {
            var params = api_params();
            assert_params(params, {
                format: 'json',
            });
        });

        it('should request address details', function() {
            var params = api_params();
            assert_params(params, {
                addressdetails: 1,
            });
        });

        it('should set the default address limit', function() {
            var params = api_params();
            assert_params(params, {
                limit: 30,
            });
        });

        it('should set a custom address limit', function() {
            var params = api_params({address_limit: 5});
            assert_params(params, {
                limit: 5,
            });
        });

        it('should set the default boundedness', function() {
            var params = api_params();
            assert_params(params, {
                bounded: 1,
            });
        });

        it('should set a custom boundedness', function() {
            var params = api_params({hard_boundary: 1});
            assert_params(params, {
                bounded: 0,
            });
        });

        it('should set the default viewbox', function() {
            var params = api_params();
            assert_params(params, {
                viewbox: 'viewbox=-180.0%2C90.0%2C180.0%2C-90.0',
            });
        });

        it('should set a custom viewbox', function() {
            var params = api_params({
                bounding_box: ["-20.0", "75.0", "65.0", "-50.0"]
            });
            assert_params(params, {
                viewbox: 'viewbox=-20.0%2C75.0%2C65.0%2C-50.0',
            });
        });
    });

    describe('.search()', function() {
        var im;

        beforeEach(function() {
            return test_utils.make_im()
                .then(function(dummy_im) {
                    im = dummy_im;
                    fixtures.openstreetmap().forEach(im.api.http.fixtures.add);
                });
        });

        it('should return a promise with a list of AddressResults', function() {
            var osm = new OpenStreetMap();
            osm.init(im);
            return osm.search('Foe Street')
                .then(function(results) {
                    assert_address_result(
                        results[0], [
                            'Foe Street, Cape Town Ward 57, Cape Town ',
                            'Subcouncil 15, Cape Town, City of Cape Town, ',
                            'Western Cape, 7925, RSA'
                        ].join(''));
                    assert_address_result(
                        results[1], [
                            'Foe Street, Amesbury, Essex County, ',
                            'Massachusetts, 01913, United States of America',
                        ].join(''));
                    assert_address_result(
                        results[2], [
                            'Foe Street, Wolfeboro, Carroll County, ',
                            'New Hampshire, 03894, United States of America',
                        ].join(''));
                    assert.strictEqual(results.length, 3);
                });
        });

        it('should use the custom api_url if one is given', function() {
            var osm = new OpenStreetMap({
                api_url: 'http://example.com/nominatim/v1/search.php',
            });
            osm.init(im);
            return osm.search('Moon')
                .then(function(results) {
                    assert_address_result(results[0], "Lake Serenity, The Moon");
                    assert.strictEqual(results.length, 1);
                });
        });

        describe('should return a promise with an empty list if', function() {
            it('the response has no data', function() {
                var osm = new OpenStreetMap();
                osm.init(im);
                return osm.search("no_data")
                    .then(function(results) {
                        assert.deepEqual(results, []);
                    });
            });

            it('the response data is empty', function() {
                var osm = new OpenStreetMap();
                osm.init(im);
                return osm.search("empty_data")
                    .then(function(results) {
                        assert.deepEqual(results, []);
                    });
            });
        });
    });
});
