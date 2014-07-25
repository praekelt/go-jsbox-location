var vumigo = require('vumigo_v02');
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


    });
});
