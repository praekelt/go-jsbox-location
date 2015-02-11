var assert = require('assert');

var vumigo = require('vumigo_v02');
var test_utils = vumigo.test_utils;

var location = require('../../../lib');

var providers = location.providers;
var openstreetmap = location.providers.openstreetmap;
var FixtureParameterMissingError = providers.utils.FixtureParameterMissingError;

var assert_address_result = location.test_utils.assert_address_result;

describe('openstreetmap.fixture', function() {
    it('should return a fixture', function() {
        assert.deepEqual(
            openstreetmap.fixture({
                query: "Baker Street",
                address_list: ["2B", "Not 2B"],
            }),
            {
               request: {
                   method: "GET",
                   url: "http://open.mapquestapi.com/nominatim/v1/search.php",
                   params: {
                       format: "json",
                       q: "Baker Street",
                       addressdetails: "1",
                       bounded: "1",
                       limit: "30",
                       viewbox: "-180.0,90.0,180.0,-90.0"
                   },
               },
               response: {
                   code: 200,
                   data: [
                       {
                           display_name: "2B",
                       },
                       {
                           display_name: "Not 2B",
                       },
                   ],
               },
            }
        );
    });

    it('should require a query parameter', function() {
        assert.throws(
            function() {
                openstreetmap.fixture({
                    address_list: ["2B"],
                });
            },
            function(err) {
                assert(err instanceof FixtureParameterMissingError,
                       "Expected an instance of FixtureParameterMissingError");
                assert.strictEqual(err.message, [
                    "'query' option is required when creating an",
                    " OpenStreetMap fixture.",
                ].join(""));
                return true;
            }
        );
    });

    it('should allow setting the hard boundary', function() {
       var fixture = openstreetmap.fixture({
           query: "Where am I?",
           hard_boundary: false,
       });
       assert.strictEqual(fixture.request.params.bounded, "0");
    });

    it('should allow setting the address limit', function() {
       var fixture = openstreetmap.fixture({
           query: "Where am I?",
           address_limit: 5,
       });
       assert.strictEqual(fixture.request.params.limit, "5");
    });

    it('should allow setting the bounding box', function() {
       var fixture = openstreetmap.fixture({
           query: "Where am I?",
           bounding_box: ["1.0", "2.0", "3.0", "4.0"],
       });
       assert.strictEqual(
           fixture.request.params.viewbox,
           "1.0,2.0,3.0,4.0"
       );
    });

    it('should allow overriding the request url', function() {
       var fixture = openstreetmap.fixture({
           query: "Where am I?",
           request_url: "http://www.example.com",
       });
       assert.strictEqual(fixture.request.url, "http://www.example.com");
    });

    it('should default to an empty address list', function() {
       var fixture = openstreetmap.fixture({
           query: "Place with no places",
       });
       assert.deepEqual(fixture.response.data, []);
    });

    it('should allow overriding the response data', function() {
        var fixture = openstreetmap.fixture({
            query: "Can has custom data?",
            address_list: ["Ignored place"],
            response_data: [
                {place: 1}, {place: 2},
            ],
        });
        assert.deepEqual(fixture.response.data, [
            {place: 1}, {place: 2},
        ]);
    });

    describe('when used with the OpenStreetMap provider', function() {
        var im, osm;

        beforeEach(function() {
            osm = new openstreetmap.OpenStreetMap();
            return test_utils
                .make_im()
                .then(function(dummy_im) {
                    im = dummy_im;
                    return osm.init(im);
                });
        });

        it('should provide fixtures for searches', function() {
            var fixture = openstreetmap.fixture({
                query: "Baker Street",
                address_list: ["2B", "Not 2B"],
            });
            im.api.http.fixtures.add(fixture);
            return osm
                .search("Baker Street")
                .then(function(results) {
                    assert_address_result(results[0], "2B");
                    assert_address_result(results[1], "Not 2B");
                    assert.strictEqual(results.length, 2);
                });
        });
    });
});
