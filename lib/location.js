var _ = require('lodash');
var Q = require('q');

var vumigo = require('vumigo_v02');
var states = vumigo.states;
var State = states.State;
var providers = require('./providers');
var GoogleMaps = providers.googlemaps.GoogleMaps;


var LocationState = State.extend(function (self, name, opts) {
    /**class:LocationState(name, opts)

    A state which requests a location from the user, and sets the user data
    through getting the location data from the Google Maps API. It may also
    request a second prompt from the user to further refine the location
    if the first prompt wasn't clear enough.

    :param string name:
        name used to identify and refer to the state
    :param string_or_LazyText opts.question:
        The question to first display to the user. Defaults to
        ``What is your address?``.
    :type opts.map_provider:
        an instance of :class:``location.providers.utils.Provider``
    :param opts.map_provider:
        The provider to use when searching for locations. Defaults to
        an instance of :class:``location.providers.googlemaps.GoogleMaps``.
    :param string_or_LazyText opts.refine_question:
        The question to display to the user when selecting a location from a
        list if the first search query wasn't clear enough. Defaults to
        ``Please select your location from the following:``
    :param string_or_LazyText opts.error_question:
        The question to display to the user when no locations are found for
        their search term. It will keep requesting until results are found.
        Defaults to ``Error: No results for your search term. Please try another
        search term.``
    :param boolean opts.continue_session:
        whether or not this is the last state in a session. Defaults to ``true``.
    :param boolean opts.send_reply:
        whether or not a reply should be sent to the user's message. Defaults
        to ``true``.
    :param function_or_string_or_object opts.next:
        The state that the user should visit after this state. May either be the
        name of the next state, an options object representing the next state,
        or a function of the form ``f(content)`` returning either, where
        ``content`` is the input given by the user. If ``next`` is ``null`` or
        not defined, the state machine will be left in the current state. See
        :meth:`State.set_next_state`. Defaults to ``null``
    :param integer opts.options_per_page:
        The maximum limit for the amount of choices on each page. Defaults to ``8``.
    :param integer opts.characters_per_page:
        The maximum limit for the amount of characters on each page.
        Defaults to ``160``. Whichever one of characters_per_page or option_per_page
        is reached first will be chosen.
    :param string opts.next_text:
        The text to display for the next page option. Defaults to ``Next``.
    :param string opts.previous_text:
        The text to display for the previous page option. Defaults to
        ``Previous``.
    :param string opts.namespace:
        The namespace to use when storing the contact details, ie.
        ``location:....``. Defaults to ``location``.
    :param object opts.events:
        Optional event name-listener mappings to bind.

    Example:

    .. code-block:: javascript

        self.states.add('states:example-locationState', function(name){
            return new LocationState(name, {
                question: ["Welcome to the location app.",
                    "What is your current address?"].join("\n"),
                next: "states:end",
                previous_text: "Prev",
            });
        });

    Each provider has its own ``.fixture(...)`` function for
    conveniently creating HTTP resource fixtures for its location queries. See
    the documentation for each provider on how to use these.

    */

    // Defaults
    opts = _.defaults(opts || {}, {
        next:null,
        question:'What is your address?',
        refine_question:'Please select your location from the following:',
        error_question:[
                        'Error: No results for your search term.',
                        'Please try another search term.'
                        ].join('\n'),
        options_per_page:8,
        characters_per_page:160,
        next_text:"Next",
        previous_text:"Previous",
        namespace:'location',
        map_provider: null,
    });

    State.call(self, name, opts);

    // Store options
    self.next = opts.next;
    self.question_text = opts.question;
    self.refine_question_text = opts.refine_question;
    self.error_question = opts.error_question;
    self.options_per_page = opts.options_per_page;
    self.characters_per_page = opts.characters_per_page;
    self.next_text = opts.next_text;
    self.previous_text = opts.previous_text;
    self.namespace = opts.namespace;
    self.map_provider = opts.map_provider || new GoogleMaps();

    self.init = function() {
        _.defaults(self.metadata, {locationstate:'initial'});
        return Q(self.map_provider.init(self.im))
            .then(function() {
                return self.im.contacts.for_user();
            })
            .then(function(user_contact) {
                self.contact = user_contact;
            });
    };

    self.on('state:input', function(event) {
        var content = (event.content || "").trim();
        var handler = self.handlers[self.metadata.locationstate];
        handler = handler || self.handlers.default;
        return handler(content);
    });

    self.handlers = {};

    self.handlers.default = function(content) {
        return self.set_next_state(self.next, null);
    };

    // Dependant on API response, select next state
    self.handlers.initial = function(content) {
        // Send the API request
        return self.map_provider.search(content)
            .then(function(addresses) {
                // Error state for no results found
                if(!addresses || addresses.length === 0) {
                    self.metadata.display_text = self.error_question;
                    self.metadata.locationstate = 'initial';
                    return;
                }
                // If more than one result is found, list them
                if(addresses.length > 1) {
                    self.metadata.pages = self.generate_pages(addresses);
                    self.metadata.display_text = self.metadata.pages
                        [self.metadata.current_page].page_text;
                    self.metadata.locationstate = 'refinequestion';
                    return;
                }
                // If only one result is found, store and enter next state
                return self.store_contact_data(addresses[0])
                    .then(function() {
                        return self.set_next_state(self.next, addresses[0]);
                    });
            });
    };

    // Handler for user response to refine location
    self.handlers.refinequestion = function(content) {
        var handler = {
            n: self.handlers.refinequestion.next,
            p: self.handlers.refinequestion.prev
        }[content];

        handler = handler || self.handlers.refinequestion.number;
        return handler(content);
    };

    // User selects next page
    self.handlers.refinequestion.next = function(content) {
        // Set page number checking for limits
        if (++self.metadata.current_page >= self.metadata.pages.length) {
            self.metadata.current_page = self.metadata.pages.length-1;
        }
        // Set page text
        self.metadata.display_text = self.metadata.pages
            [self.metadata.current_page].page_text;
        return;
    };

    // User selects previous page
    self.handlers.refinequestion.prev = function(content) {
        // Set page number checking for limits
        if (--self.metadata.current_page < 0) {
            self.metadata.current_page = 0;
        }
        // Set page text
        self.metadata.display_text = self.metadata.pages
            [self.metadata.current_page].page_text;
        return;
    };

    // User selects location
    self.handlers.refinequestion.number = function(content) {
        if(isNaN(content)) { return; }
        // Store the selected address, and advance to next state
        var current_page_no = self.metadata.current_page;
        var address = self.metadata.pages[current_page_no].options[content-1];
        return self.store_contact_data(address)
            .then(function() {
                return self.set_next_state(self.next, address);
            });
    };

    // This function takes the list of addresses and generates an array of page
    // objects, with the properties page_text, which is the text that should be
    // displayed, and page_options, which is an array of addresses that appear
    // on the page. It obeys the character and choice limit per page set in the
    // options.
    self.generate_pages = function(addresses) {
        self.metadata.current_page = 0;
        var pages = [];
        var current_page = self.refine_question_text;
        var current_option_number = 1, current_address_number = 0;
        var page_options = [];
        var footer = self.generate_footer();

        while(current_address_number < addresses.length) {

            while(current_option_number <= self.options_per_page) {
                var choice_text = self.format_choice(current_option_number,
                    addresses[current_address_number]);
                // Check for character limit
                if((current_page.length + choice_text.length + footer.length)
                    > self.characters_per_page)
                { break; }

                // Add address to current page if limit isn't reached
                current_page += choice_text;
                page_options.push(addresses[current_address_number]);
                current_option_number += 1;
                current_address_number += 1;

                // If we reach the end of the address list.
                if(current_address_number >= addresses.length) {break;}
            }

            // Add footer text to end of page
            current_page += footer;
            // Add page and clear variables for next page
            pages.push({page_text:current_page, options:page_options});
            current_option_number = 1;
            page_options = [];
            current_page = self.refine_question_text;
        }
        return pages;
    };

    self.format_choice = function(number, address) {
        return '\n' + number + '. ' + address.label;
    };

    self.generate_footer = function() {
        return '\n' + 'n. '+self.next_text + '\n' + 'p. '+self.previous_text;

    };

    // Stores the address data to the contact. Stores the string 'data' in the
    // ContactStore
    self.store_contact_data = function(address) {
        var data = self.flatten_object(address.data);
        // Store each parameter
        _.each(data, function(value, parameter) {
            self.contact.extra[self.namespace + ':' +
                parameter.replace(/\./g, ':')] = '' + value;
        });
        return self.im.contacts.save(self.contact);
    };

    // Takes in a nested object and flattens it into a single layer object
    self.flatten_object = function(obj) {
        var result = {};
        // Recursive function for traversing object
        function rec (current, property) {
            // If it isn't an object, store
            if(typeof current !== 'object') {
                result[property] = current;
            } else {
                _.forEach(current, function(value, param) {
                    // `:` separator for objects
                    rec(value, property ? property + ':' + param : param);
                });
            }
        }
        rec(obj, "");
        return result;
    };

    self.translate = function(i18n) {
        self.question_text = i18n(self.question_text);
        self.refine_question_text = i18n(self.refine_question_text);
        self.error_question = i18n(self.error_question);
        self.next_text = i18n(self.next_text);
        self.previous_text = i18n(self.previous_text);
    };

    self.display = function() {
        return self.metadata.display_text || self.question_text;
    };

});

this.LocationState = LocationState;
