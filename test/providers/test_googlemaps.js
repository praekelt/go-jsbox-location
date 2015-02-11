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

describe('GoogleMaps.fixture', function() {
    it('should return a fixture', function() {
        assert.deepEqual(
            GoogleMaps.fixture({
                query: "Baker Street",
                address_list: ["2B", "Not 2B"],
            }),
            {
                request: {
                    method: "GET",
                    url: "http://maps.googleapis.com/maps/api/geocode/json",
                    params: {
                        address: "Baker Street",
                    },
                },
                response: {
                    code: '200',
                    data: {
                        status: 'OK',
                        results: [
                            {formatted_address: '2B'},
                            {formatted_address: 'Not 2B'},
                        ]
                    },
                },
            }
        );
    });

    it('should require a query parameter', function() {
        assert.throws(
            function() {
                GoogleMaps.fixture({
                    address_list: ["2B"],
                });
            },
            function(err) {
                expected = [
                    "'query' option is required when creating a",
                    " GoogleMaps fixture.",
                ].join("");
                if ((err instanceof providers.FixtureParameterMissingError) &&
                    (err.message === expected))
                    return true;
            }
        );
    });

    it('should allow overriding the request url', function() {
       var fixture = GoogleMaps.fixture({
           query: "Where am I?",
           request_url: "http://www.example.com",
       });
       assert.strictEqual(fixture.request.url, "http://www.example.com");
    });

    it('should default to an empty address list', function() {
       var fixture = GoogleMaps.fixture({
           query: "Place with no places",
       });
       assert.deepEqual(fixture.response.data.results, []);
    });

    it('should allow overriding the response data', function() {
        var fixture = GoogleMaps.fixture({
            query: "Can has custom data?",
            address_list: ["Ignored place"],
            response_data: {
                this_is_the_data: "you are looking for",
            },
        });
        assert.deepEqual(fixture.response.data, {
            this_is_the_data: "you are looking for",
        });
    });

    describe('when used with the GoogleMaps provider', function() {
        var im, gm;

        beforeEach(function() {
            gm = new GoogleMaps();
            return test_utils
                .make_im()
                .then(function(dummy_im) {
                    im = dummy_im;
                    return gm.init(im);
                });
        });

        it('should provide fixtures for searches', function() {
            var fixture = GoogleMaps.fixture({
                query: "Baker Street",
                address_list: ["2B", "Not 2B"],
            });
            im.api.http.fixtures.add(fixture);
            return gm
                .search("Baker Street")
                .then(function(results) {
                    assert_address_result(results[0], "2B");
                    assert_address_result(results[1], "Not 2B");
                    assert.strictEqual(results.length, 2);
                });
        });
    });
});
