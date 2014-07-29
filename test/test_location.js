var vumigo = require('vumigo_v02');
var fixtures = require('./fixtures');
var App = vumigo.App;
var AppTester = vumigo.AppTester;
var EndState = vumigo.states.EndState;
var location = require('../lib/location.js');
var LocationState = location.LocationState;
var assert = require('assert');

describe('states.location', function() {
    describe('LocationState', function() {
        var app;
        var tester;

        beforeEach(function(){
            app = new App('states:test');

            tester = new AppTester(app);

            app.states.add('states:test', function(name) {
                tester.data.opts = {next:'states:end'};
                return new LocationState(name, tester.data.opts);
            });

            app.states.add('states:test-custom', function(name) {
                tester.data.opts = {
                    question:'Custom location question',
                    error_question:'Custom error question',
                    refine_question:'Custom refine question',
                    next_text:'N',
                    previous_text:'P',
                    store_fields:['types'],
                    next:'states:end'
                    };
                return new LocationState(name, tester.data.opts);
            });

            app.states.add('states:test-limit', function(name) {
                tester.data.opts = {
                    options_per_page:'1'
                };
                return new LocationState(name, tester.data.opts);
            });

            app.states.add('states:test-charlimit', function(name) {
                tester.data.opts = {
                    characters_per_page:200
                };
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

        it('should display the next page if next is selected',
        function() {
            return tester
                .inputs("Friend Street", 'n')
                .check.interaction({
                    state:'states:test',
                    reply:["Please select your location from the following:",
                        "1. Friend Street, Berkley, MA 02779, USA",
                        "2. Friend Street, Boston, MA 02114, USA",
                        "n. Next",
                        "p. Previous"].join('\n')
                })
                .run();
        });

        it('should go back to the first page if next then previous is selected',
        function() {
            return tester
                .inputs("Friend Street", 'n', 'p')
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

        it('should stay on the first page if there are no pages to go back to',
        function() {
            return tester
                .inputs("Friend Street", 'p')
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

        it('should stay on the last page if there are no more pages',
        function() {
            return tester
                .inputs("Friend Street", 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n',
                    'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n')
                .check.interaction({
                    state:'states:test',
                    reply:[
                        "Please select your location from the following:",
                        "1. Friend Street, Kittery, ME 03904, USA",
                        "n. Next",
                        "p. Previous"
                        ].join('\n')
                })
                .run();
        });

        it('should go to the next state when location is selected from list',
        function() {
            return tester
                .inputs("Friend Street", '1')
                .check.interaction({
                    state:'states:end'
                })
                .check(function(api) {
                    var contact = api.contacts.store[0];
                    assert.equal(contact.location, JSON.stringify({
                        formatted_address:
                            "Friend Street, Amesbury, MA 01913, USA"
                    }));
                })
                .run();
        });

        it('should go to the next state when location is selected on any page',
        function() {
            return tester
                .inputs("Friend Street", 'n', '2')
                .check.interaction({
                    state:'states:end'
                })
                .check(function(api) {
                    var contact = api.contacts.store[0];
                    assert.equal(contact.location, JSON.stringify({
                        formatted_address:
                            'Friend Street, Boston, MA 02114, USA'
                    }));
                })
                .run();
        });

        it('should go to the next state if there is only one result',
        function() {
            return tester
                .inputs("Friend Street, South Africa")
                .check.interaction({
                    state:'states:end'
                })
                .check(function(api) {
                    var contact = api.contacts.store[0];
                    assert.equal(contact.location, JSON.stringify({
                            formatted_address:
                                "Friend Street, Cape Town 7925, South Africa"
                        }));
                })
                .run();
        });

        it('should store the requested custom fields when the result is chosen',
        function() {
            return tester
            .setup.user.state({
                name:'states:test-custom',
            })
            .inputs('Friend Street, South Africa')
            .check.interaction({
                state:'states:end'
            })
            .check(function(api) {
                var contact = api.contacts.store[0];
                assert.equal(contact.location, JSON.stringify({
                    "types" : [ "route" ]
                }));
            })
            .run();
        });

        it('should display a custom message when the custom fields are chosen',
        function() {
            return tester
            .setup.user.state({
                name:'states:test-custom'
            })
            .inputs('Friend Street')
            .check.interaction({
                state:'states:test-custom',
                reply:[
                    'Custom refine question',
                    '1. Friend Street, Amesbury, MA 01913, USA',
                    '2. Friend Street, Adams, MA 01220, USA',
                    '3. Friend Street, Berkley, MA 02779, USA',
                    'n. N',
                    'p. P'
                ].join('\n')
            })
            .run();
        });

        it('should display a custom error message when custom field is chosen',
        function() {
            return tester
            .setup.user.state({
                name:'states:test-custom'
            })
            .inputs('agx')
            .check.interaction({
                state:'states:test-custom',
                reply:[
                    'Custom error question'
                ].join('\n')
            })
            .run();
        });

        it('should limit the amount of options per page when the field is set',
        function() {
            return tester
            .setup.user.state({
                name:'states:test-limit'
            })
            .inputs("Friend Street")
            .check.interaction({
                state:'states:test-limit',
                reply:[
                    'Please select your location from the following:',
                    '1. Friend Street, Amesbury, MA 01913, USA',
                    'n. Next',
                    'p. Previous'
                ].join('\n')
            })
            .run();
        });

        it('should limit the amount of characters per page when field is set',
        function() {
            return tester
            .setup.user.state({
                name:'states:test-charlimit'
            })
            .inputs("Friend Street")
            .check.interaction({
                char_limit:200
            })
            .run();
        });

    });
});
