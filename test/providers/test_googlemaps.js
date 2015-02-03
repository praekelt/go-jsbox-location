var assert = require('assert');

var fixtures = require('../fixtures');

var vumigo = require('vumigo_v02');
var JsonApi = vumigo.http.api.JsonApi;
var test_utils = vumigo.test_utils;

var providers = require('../../lib/providers');
var Provider = providers.Provider;
var AddressResult = providers.AddressResult;
var GoogleMaps = providers.GoogleMaps;

var loc_test_utils = require('../../lib/test_utils');
var assert_address_result = loc_test_utils.assert_address_result;


describe('GoogleMaps', function() {
    it('should extend Provider', function() {
        var gm = new GoogleMaps();
        assert(gm instanceof Provider);
    });

    describe('.init()', function() {
        it('should create a JsonApi', function() {
            var gm = new GoogleMaps();
            var dummy_im = {};
            assert.strictEqual(gm.http, null);
            gm.init(dummy_im);
            assert(gm.http instanceof JsonApi);
        });
    });

    describe('extract_address_label', function() {
        it('the default should return formatted_address', function() {
            var gm = new GoogleMaps();
            var label = gm.extract_address_label({
                formatted_address: 'the label',
                other: 'something entirely different',
            });
            assert.strictEqual(label, 'the label');
        });

        it('should be overrideable', function() {
            var gm = new GoogleMaps({
                extract_address_label: function(r) {
                    return r.custom_label;
                },
            });
            var label = gm.extract_address_label({
                formatted_address: 'the ordinary label',
                custom_label: 'customised label',
            });
            assert.strictEqual(label, 'customised label');
        });
    });-

    describe('extract_address_data', function() {
        it('the default should return formatted_address', function() {
            var gm = new GoogleMaps();
            var data = gm.extract_address_data({
                formatted_address: 'the address',
                other: 'something entirely different',
            });
            assert.deepEqual(data, {formatted_address: 'the address'});
        });

        it('should be overrideable', function() {
            var gm = new GoogleMaps({
                extract_address_data: function(r) {
                    return {custom: r.custom_data};
                },
            });
            var data = gm.extract_address_data({
                formatted_address: 'the address',
                custom_data: 'customised data',
            });
            assert.deepEqual(data, {custom: 'customised data'});
        });
    });

    describe('extract_address', function() {
        it('should have a default', function() {
            var gm = new GoogleMaps();
            var addr = gm.extract_address({
                formatted_address: 'the address',
                extraneous_field: 'extraneous value',
            });
            assert(addr instanceof AddressResult);
            assert.strictEqual(addr.label, 'the address');
            assert.deepEqual(addr.data, {formatted_address: 'the address'});
        });

        describe('should respect overrides of', function() {
            it('extract_address_label', function() {
                var gm = new GoogleMaps({
                    extract_address_label: function(r) {
                        return r.override;
                    },
                });
                var addr = gm.extract_address({
                    formatted_address: 'the address',
                    override: 'max override',
                });
                assert.strictEqual(addr.label, 'max override');
            });

            it('extract_address_data', function() {
                var gm = new GoogleMaps({
                    extract_address_data: function(r) {
                        return {custom: r.snowflake};
                    },
                });
                var addr = gm.extract_address({
                    formatted_address: 'the address',
                    snowflake: 'unique',
                });
                assert.deepEqual(addr.data, {custom: 'unique'});
            });
        });
    });

    describe('.search()', function() {
        var im;

        beforeEach(function() {
            return test_utils.make_im()
                .then(function(dummy_im) {
                    im = dummy_im;
                    fixtures.googlemaps().forEach(im.api.http.fixtures.add);
                });
        });

        it('should return a promise with a list of AddressResults', function() {
            var gm = new GoogleMaps();
            gm.init(im);
            return gm.search('Friend Street')
                .then(function(results) {
                    assert_address_result(
                        results[0], 'Friend Street, Amesbury, MA 01913, USA');
                    assert_address_result(
                        results[1], 'Friend Street, Adams, MA 01220, USA');
                    assert_address_result(
                        results[results.length - 1],
                        'Friend Street, Kittery, ME 03904, USA');
                    assert.strictEqual(results.length, 30);
                });
        });

        it('should use the custom api_url if one is given', function() {
            var gm = new GoogleMaps({
                api_url: 'http://maps.example.com/maps/api/geocode/json',
            });
            gm.init(im);
            return gm.search('Moon')
                .then(function(results) {
                    assert_address_result(results[0], "Lake Serenity, The Moon");
                    assert.strictEqual(results.length, 1);
                });
        });

        describe('should return a promise with an empty list if', function() {
            it('the api request status is not OK', function() {
                var gm = new GoogleMaps();
                gm.init(im);
                return gm.search("agx")
                    .then(function(results) {
                        assert.deepEqual(results, []);
                    });
            });

            it('the response has no data', function() {
                var gm = new GoogleMaps();
                gm.init(im);
                return gm.search("no_data")
                    .then(function(results) {
                        assert.deepEqual(results, []);
                    });
            });
        });
    });
});
