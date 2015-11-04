var assert = require('assert');
var _ = require('lodash');

var vumigo = require('vumigo_v02');
var App = vumigo.App;
var AppTester = vumigo.AppTester;
var EndState = vumigo.states.EndState;
var config = vumigo.fixtures.config;
var test_utils = vumigo.test_utils;

var location = require('../lib');
var LocationState = location.LocationState;
var AddressResult = location.providers.utils.AddressResult;
var googlemaps = location.providers.googlemaps;
var GoogleMaps = googlemaps.GoogleMaps;

var fixtures = require('./fixtures');

describe('states.location', function() {
    describe('LocationState', function() {
        var app;
        var tester;
        var locations;

        beforeEach(function(){
            app = new App('states:test');

            tester = new AppTester(app);

            tester.data.opts = {};

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


        it('should go to the next state when skip selected', function() {
            tester.data.opts.skip_text = 'Skip';
            return tester
                .inputs("Friend Street", 's')
                .check.interaction({
                    state:'states:end'
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

        it('should go back to initial page if retry is selected',
        function() {
            tester.data.opts.retry_text = 'Retry';
            return tester
                .inputs("Friend Street", 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n',
                    'n', 'n', 'n', 'n', 'n', 'n', 'n', 'r')
                .check.interaction({
                    state:'states:test',
                    reply:['What is your address?']
                })
                .run();
        });


        describe('when a location is selected from the list', function() {
            it('should go to the next state', function() {
                return tester
                    .inputs("Friend Street", '1')
                    .check.interaction({
                        state:'states:end'
                    })
                    .check(function(api) {
                        var contact = api.contacts.store[0];
                        assert.equal(contact.extra['location:formatted_address'],
                                     'Friend Street, Amesbury, MA 01913, USA');
                    })
                    .run();
            });
            it('should pass the address to the next function', function() {
                var address_chosen;
                tester.data.opts.next = function(address) {
                    address_chosen = address;
                    return 'states:end';
                };
                return tester
                    .inputs("Friend Street", '1')
                    .check.interaction({
                        state:'states:end'
                    })
                    .check(function(api) {
                        assert(
                            address_chosen instanceof AddressResult,
                            "Expected an AddressResult");
                        assert.strictEqual(
                            address_chosen.label,
                            'Friend Street, Amesbury, MA 01913, USA');
                    })
                    .run();
            });
        });

        describe('when a location is selected on any page', function() {
            it('should go to the next state', function() {
                return tester
                    .inputs("Friend Street", 'n', '2')
                    .check.interaction({
                        state:'states:end'
                    })
                    .check(function(api) {
                        var contact = api.contacts.store[0];
                        assert.equal(contact.extra['location:formatted_address'],
                                     'Friend Street, Boston, MA 02114, USA');
                    })
                    .run();
            });
            it('should pass the address to the next function', function() {
                var address_chosen;
                tester.data.opts.next = function(address) {
                    address_chosen = address;
                    return 'states:end';
                };
                return tester
                    .inputs("Friend Street", 'n', '2')
                    .check.interaction({
                        state:'states:end'
                    })
                    .check(function(api) {
                        assert(
                            address_chosen instanceof AddressResult,
                            "Expected an AddressResult");
                        assert.strictEqual(
                            address_chosen.label,
                            'Friend Street, Boston, MA 02114, USA');
                    })
                    .run();
            });
        });

        describe('when there is only one result', function() {
            it('should go to the next state', function() {
                return tester
                    .inputs("Friend Street, South Africa")
                    .check.interaction({
                        state:'states:end'
                    })
                    .check(function(api) {
                        var contact = api.contacts.store[0];
                        assert.equal(contact.extra['location:formatted_address'],
                                     'Friend Street, Cape Town 7925, South Africa');
                    })
                    .run();
            });
            it('should pass the address to the next function', function() {
                var address_chosen;
                tester.data.opts.next = function(address) {
                    address_chosen = address;
                    return 'states:end';
                };
                return tester
                    .inputs("Friend Street, South Africa")
                    .check.interaction({
                        state:'states:end'
                    })
                    .check(function(api) {
                        assert(
                            address_chosen instanceof AddressResult,
                            "Expected an AddressResult");
                        assert.strictEqual(
                            address_chosen.label,
                            'Friend Street, Cape Town 7925, South Africa');
                    })
                    .run();
            });
        });

        it('should store the requested custom address data when the result is chosen',
        function() {
            tester.data.opts.map_provider = new GoogleMaps({
                extract_address_data: _.partialRight(_.pick, 'types'),
            });
            return tester
            .inputs('Friend Street, South Africa')
            .check.interaction({
                state:'states:end'
            })
            .check(function(api) {
                var contact = api.contacts.store[0];
                assert.equal(contact.extra['location:types:0'], 'route');
            })
            .run();
        });

        it('should display a custom message when the custom fields are chosen',
        function() {
            tester.data.opts.refine_question = "Custom refine question";
            tester.data.opts.next_text = 'N';
            tester.data.opts.previous_text = 'P';
            return tester
            .inputs('Friend Street')
            .check.interaction({
                state:'states:test',
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
            tester.data.opts.error_question = "Custom error question";
            return tester
            .inputs('agx')
            .check.interaction({
                state:'states:test',
                reply:[
                    'Custom error question'
                ].join('\n')
            })
            .run();
        });

        it('should limit the amount of options per page when the field is set',
        function() {
            tester.data.opts.options_per_page = 1;
            return tester
            .inputs("Friend Street")
            .check.interaction({
                state:'states:test',
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
            tester.data.opts.char_limit = 200;
            return tester
            .inputs("Friend Street")
            .check.interaction({
                char_limit:200
            })
            .run();
        });

        it('should convert dots to colons in nested address data',
        function() {
            tester.data.opts.map_provider = new GoogleMaps({
                extract_address_data: function(result) {
                    return {'geometry.bounds.northeast.lng':
                            result.geometry.bounds.northeast.lng};
                }
            });
            return tester
            .inputs("Friend Street, South Africa")
            .check.interaction({
                state:'states:end'
            })
            .check(function(api) {
                var contact = api.contacts.store[0];
                assert.equal(contact.extra[
                    'location:geometry:bounds:northeast:lng'],
                    '18.4575469');
            })
            .run();
        });

        it('should unnest nested parameters if the given object is nested',
        function() {
            tester.data.opts.map_provider = new GoogleMaps({
                extract_address_data: function(result) {
                    return {'geometry.bounds':
                            result.geometry.bounds};
                }
            });
            return tester
                .inputs("Friend Street, South Africa")
                .check.interaction({
                    state:'states:end'
                })
                .check(function(api) {
                    var contact = api.contacts.store[0];
                    assert.equal(contact.extra[
                        'location:geometry:bounds:northeast:lat'],
                        '-33.9338399');
                    assert.equal(contact.extra[
                        'location:geometry:bounds:southwest:lng'], '18.45667');
                })
                .run();
        });

        it('should translate the first question',
        function(){
            tester.data.opts.question = test_utils.$('hello');

            return tester
                .setup.config(config())
                .setup.user.lang('af')
                .input()
                .check.reply([
                    "hallo"
                ].join('\n'))
                .run();
        });

        it('should translate the error question',
        function(){
            tester.data.opts.error_question = test_utils.$('no!');
            return tester
                .setup.config(config())
                .setup.user.lang('af')
                .inputs('agx')
                .check.reply([
                    "nee!"
                ].join('\n'))
                .run();
        });

        it('should translate the refine question and page prompts',
        function(){
            tester.data.opts.refine_question = test_utils.$('hello?');
            tester.data.opts.next_text = test_utils.$('yes');
            tester.data.opts.previous_text = test_utils.$('no');

            return tester
                .setup.config(config())
                .setup.user.lang('af')
                .input("Friend Street")
                .check.reply([
                    "hallo?",
                    "1. Friend Street, Amesbury, MA 01913, USA",
                    "2. Friend Street, Adams, MA 01220, USA",
                    "3. Friend Street, Berkley, MA 02779, USA",
                    "n. ja",
                    "p. nee"
                ].join('\n'))
                .run();
        });

        it('should recognize user added addresses for fixtures',
        function() {
            locations.push({
                query: "New Street",
                address_list: ["New Street 1", "New Street 2"],
            });
            return tester
                .input("New Street")
                .check.reply([
                    'Please select your location from the following:',
                    '1. New Street 1',
                    '2. New Street 2',
                    'n. Next',
                    'p. Previous'
                    ].join('\n'))
                .run();
        });

        it('should recognize user added response objects for fixtures',
        function() {
            locations.push({
                query: "Another Street",
                response_data: {
                    results: [{
                        "formatted_address": "Another Street, Suburb",
                        "types": ["route"]
                    }],
                    status:"OK"
                }
            });

            tester.data.opts.map_provider = new GoogleMaps({
                extract_address_data: _.partialRight(_.pick, 'types'),
            });

            return tester
                .input("Another Street")
                .check(function(api) {
                    var contact = api.contacts.store[0];
                    assert.equal(contact.extra['location:types:0'], 'route');
                })
                .run();

        });

        it('should store the data in the user defined namespace',
        function() {
            tester.data.opts.namespace = 'from_location';
            return tester
            .inputs("Friend Street, South Africa")
            .check.interaction({
                state:'states:end'
            })
            .check(function(api) {
                var contact = api.contacts.store[0];
                assert.equal(contact.extra[
                    'from_location:formatted_address'],
                    'Friend Street, Cape Town 7925, South Africa');
            })
            .run();
        });

    });
});
