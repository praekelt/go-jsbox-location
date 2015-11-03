var _ = require('lodash');

var vumigo = require('vumigo_v02');
var App = vumigo.App;
var AppTester = vumigo.AppTester;
var EndState = vumigo.states.EndState;

var location = require('../lib');
var LocationState = location.LocationState;
var googlemaps = location.providers.googlemaps;

var fixtures = require('./fixtures');

describe('states.location', function() {
    describe('LocationState', function() {
        var app;
        var tester;
        var locations;

        beforeEach(function(){
            app = new App('states:test');

            tester = new AppTester(app);

            tester.data.opts = {skip_text: "Skip"};

            locations = [];

            app.states.add('states:test', function(name) {
                _.defaults(tester.data.opts, {next:'states:end'});
                return new LocationState(name, tester.data.opts);
            });

            app.states.add('states:end', function(name) {
                return new EndState(name, {
                    text: 'This is the end state.'
                });
            });

            tester
                .setup.config.app({
                    name: 'locationState-tester'
                })
                .setup(function(api) {
                    fixtures.googlemaps().forEach(api.http.fixtures.add);
                    locations.forEach(function(location) {
                        api.http.fixtures.add(googlemaps.fixture(location));
                    });
                });
        });

        it('should request the user for a location with default message',
        function() {
            return tester
                .start()
                .check.interaction({
                    state:'states:test',
                    reply:'What is your address?',
                })
                .run();

        });

        it('should request the user for a location with a custom message',
        function() {
            tester.data.opts.question = 'Custom location question';
            return tester
                .start()
                .check.interaction({
                    state:'states:test',
                    reply:'Custom location question',
                    })
                .run();
        });

        it('should give a list of locations when the user enters an address',
        function() {
            return tester
                .inputs("Friend Street")
                .check.interaction({
                    state:'states:test',
                    reply:[
                        'Please select your location from the following:',
                        '1. Friend Street, Amesbury, MA 01913, USA',
                        '2. Friend Street, Adams, MA 01220, USA',
                        'n. Next',
                        'p. Previous',
                        's. Skip'
                    ].join('\n')
                })
                .run();
        });
    
    
        it('should go to the next state', function() {
            return tester
                .inputs("Friend Street", 's')
                .check.interaction({
                    state:'states:end'
                })
                .run();
        });
    });
});
