var vumigo = require('vumigo_v02');
var AppTester = vumigo.AppTester;
var LocationApp = require('../lib/openstreetmap').LocationApp;
var location = require('../../lib');
var openstreetmap = location.providers.openstreetmap;

describe("OpenStreetMap example", function() {
    var app;
    var tester;
    var locations;

    beforeEach(function(){
        app = new LocationApp();
        tester = new AppTester(app);
        locations = [];

        locations.push({
            query: "Example Street",
            address_list: [
                "Example Street, Suburb",
                "Another Street, Suburb",
            ],
        });

        locations.push({
            query: "Single Street",
            address_list: [
                "Single Street, Suburb",
            ],
        });

        tester
            .setup.config.app({
                name: 'test_app'
            })
            .setup(function(api) {
                locations.forEach(function(location) {
                    api.http.fixtures.add(openstreetmap.fixture(location));
                });
            });
    });

    describe("When the user starts a session", function() {
        it("should ask the user for a location", function() {
            return tester
                .start()
                .check.interaction({
                    state: 'states:start',
                    reply: [
                        "Welcome to the location app.",
                        "What is your current address?"
                    ].join('\n')
                })
                .run();
        });
    });

    describe("When the user enters a location prompt with multiple results", function() {
        it("should ask the user to refine their choice", function() {
            return tester
                .input("Example Street")
                .check.interaction({
                    state: 'states:start',
                    reply: [
                        "Please select your location from the following:",
                        "1. Example Street, Suburb",
                        "2. Another Street, Suburb",
                        "n. Next",
                        "p. Prev"
                    ].join('\n')
                })
                .run();
        });
    });

    describe("When the user selects a location from the list", function() {
        it("should display the location data to the user", function() {
            return tester
                .inputs("Example Street", "1")
                .check.interaction({
                    state: 'states:end',
                    reply: [
                        'The location you chose is "Example Street, Suburb".',
                    ].join(''),
                })
                .run();
        });
    });

    describe("When the user enters a location prompt with one results", function() {
        it("should display the location data to the user", function() {
            return tester
                .input("Single Street")
                .check.interaction({
                    state: 'states:end',
                    reply: [
                        'The location you chose is "Single Street, Suburb".',
                    ].join(' ')
                })
                .run();
        });
    });
});
