var vumigo = require('vumigo_v02');
var AppTester = vumigo.AppTester;
var LocationApp = require('../lib/app').LocationApp;
var location = require('../../lib');
var GoogleMaps = location.GoogleMaps;

describe("app", function() {
    describe("LocationApp", function() {
        var app;
        var tester;
        var locations;

        beforeEach(function(){
            app = new LocationApp();
            tester = new AppTester(app);
            locations = [];

            locations.push({
                request:"Example Street",
                response_data: {
                    results:
                    [{
                        formatted_address: "Example Street, Suburb",
                        geometry: {
                            location:{
                                latitude: '3.1415926535',
                                longitude: '2.7182818284'
                            }
                        }
                    },
                    {
                        formatted_address: "Another Street, Suburb",
                        geometry: {
                            location: {
                                latitude: '2.7182818284',
                                longitude: '3.1415926535'
                            }
                        }
                    }],
                    status:"OK"
                }
            });

            locations.push({
                request:"Single Street",
                response_data: {
                    results:
                    [{
                        formatted_address: "Single Street, Suburb",
                        geometry: {
                            location:{
                                latitude: '1.4142135623',
                                longitude: '1.6180339887'
                            }
                        }
                    }],
                    status:"OK"
                }
            });

            tester
                .setup.config.app({
                    name: 'test_app'
                })
                .setup(function(api) {
                    locations.forEach(function(location) {
                        api.http.fixtures.add(GoogleMaps.fixture(location));
                    });
                });
        });

        describe("When the user starts a session", function(){
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

        describe("When the user enters a location prompt with multiple results",
        function() {
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
                            'The location "Example Street, Suburb" is located',
                            'at longitude 2.7182818284 and latitude',
                            '3.1415926535'
                        ].join(' ')
                    })
                    .run();
            });
        });

        describe("When the user enters a location prompt with one results",
        function(){
            it("should display the location data to the user", function() {
                return tester
                    .input("Single Street")
                    .check.interaction({
                        state: 'states:end',
                        reply: [
                            'The location "Single Street, Suburb" is located',
                            'at longitude 1.6180339887 and latitude',
                            '1.4142135623'
                        ].join(' ')
                    })
                    .run();
            });
        });

    });
});
