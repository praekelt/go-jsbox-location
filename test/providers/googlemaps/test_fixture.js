var assert = require('assert');

var vumigo = require('vumigo_v02');
var test_utils = vumigo.test_utils;

var location = require('../../../lib');

var providers = location.providers;
var googlemaps = location.providers.googlemaps;
var FixtureParameterMissingError = providers.utils.FixtureParameterMissingError;

var assert_address_result = location.test_utils.assert_address_result;

describe('googlemaps.fixture', function() {
    it('should return a fixture', function() {
        assert.deepEqual(
            googlemaps.fixture({
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
                googlemaps.fixture({
                    address_list: ["2B"],
                });
            },
            function(err) {
                assert(err instanceof FixtureParameterMissingError,
                       "Expected an instance of FixtureParameterMissingError");
                assert.strictEqual(err.message, [
                    "'query' option is required when creating a",
                    " GoogleMaps fixture.",
                ].join(""));
                return true;
            }
        );
    });

    it('should allow overriding the request url', function() {
       var fixture = googlemaps.fixture({
           query: "Where am I?",
           request_url: "http://www.example.com",
       });
       assert.strictEqual(fixture.request.url, "http://www.example.com");
    });

    it('should default to an empty address list', function() {
       var fixture = googlemaps.fixture({
           query: "Place with no places",
       });
       assert.deepEqual(fixture.response.data.results, []);
    });

    it('should allow overriding the response data', function() {
        var fixture = googlemaps.fixture({
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
            gm = new googlemaps.GoogleMaps();
            return test_utils
                .make_im()
                .then(function(dummy_im) {
                    im = dummy_im;
                    return gm.init(im);
                });
        });

        it('should provide fixtures for searches', function() {
            var fixture = googlemaps.fixture({
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
