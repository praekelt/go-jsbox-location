var vumigo = require('vumigo_v02');
var fixtures = require('./fixtures');
var App = vumigo.App;
var AppTester = vumigo.AppTester;
var EndState = vumigo.states.EndState;
var location = require('../lib/location.js');
var LocationState = location.LocationState;

describe('states.location', function() {
    describe('LocationState', function() {
        var app;
        var tester;

        beforeEach(function(){
            app = new App('states:test');

            tester = new AppTester(app);

            app.states.add('states:test', function(name) {
                return new LocationState(name, tester.data.opts);
            });

            app.states.add('states:test-custom', function(name) {
                tester.data.opts = {question:'Custom location question'};
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
                    fixtures().forEach(api.http.fixtures.add);
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
            return tester
                .setup.user.state({
                    name:'states:test-custom',
                })
                .start()
                .check.interaction({
                    state:'states:test-custom',
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
                        'p. Previous'
                    ].join('\n')
                })
                .run();
        });

        it('should give the error message if no results are found',
        function() {
            return tester
                .inputs("agx")
                .check.interaction({
                    state:'states:test',
                    reply:[
                        'Error: No results for your search term.',
                        'Please try another search term.'
                    ].join('\n')
                })
                .run();
        });

        it('should continuously give the error message if no results are found',
        function() {
            return tester
                .inputs("agx", "agy")
                .check.interaction({
                    state:'states:test',
                    reply:[
                        'Error: No results for your search term.',
                        'Please try another search term.'
                    ].join('\n')
                })
                .run();
        });

    });
});
