var _ = require('lodash');

var vumigo = require('vumigo_v02');
var states = vumigo.states;
var State = states.State;
var JsonApi = vumigo.http.api.JsonApi;

var LocationState = State.extend(function(self, name, opts) {
    /**class:Location(name, opts)

    A state which requests a location from the user, and sets the user data
    through getting the location data from the Google Maps API. It may also
    request a second prompt from the user to further refine the location
    if the first prompt wasn't clear enough.

    :param string name:
        name used to identify and refer to the state
    :type opts.question string or LazyText
    :param opts.question:
        The question to first display to the user. Defaults to
        'What is your address?'.
    :type opts.refine_question string or LazyText
    :param opts.refine_question
        The question to display to the user when selecting a location from a
        list if the first search query wasn't clear enough. Defaults to
        'Please select your location from the following:'
    :type opts.error_question string or LazyText
    :param opts.error_question
        The question to display to the user when no locations are found for
        their search term. It will keep requesting until results are found. 
        Defaults to 'Error: No results for your search term. Please try another
        search term.'
    :param boolean opts.continue_session:
        whether or not this is the last state in a session. Defaults to `true`.
    :param boolean opts.send_reply:
        whether or not a reply should be sent to the user's message. Defaults
        to `true`.
    :type opts.next function or string or object
    :param opts.next:
        The state that the user should visit after this state. May either be the
        name of the next state, an options object representing the next state,
        or a function of the form ``f(content)`` returning either, where
        ``content`` is the input given by the user. If ``next`` is ``null`` or
        not defined, the state machine will be left in the current state. See
        :meth:`State.set_next_state`. Defaults to `null`
    :type opts.options_per_page integer
    :param opts.options_per_page
        The maximum limit for the amount of choices on each page. Defaults to 8.
    :type opts.characters_per_page integer
    :param opts.characters_per_page
        The maximum limit for the amount of characters on each page.
        Defaults to 160. Whichever one of characters_per_page or option_per_page
        is reached first will be chosen.
    :param string next_text
        The text to display for the next page option. Defaults to 'Next'.
    :param string previous_text
        The text to display for the previous page option. Defaults to
        'Previous'.
    :type opts.events object
    :param opts.events:
        Optional event name-listener mappings to bind.
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
        previous_text:"Previous"
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
    self.gmapsURL = 'http://maps.googleapis.com/maps/api/geocode/json';

    self.init = function() {
        _.defaults(self.metadata, {locationstate:'initial',
                                   display_text:self.question_text});
        self.http = new JsonApi(self.im);
    };

    self.on('state:input', function(event) {
        var content = (event.content || "").trim();

        // Decide based on state
        switch(self.metadata.locationstate) {
            case 'initial':
                // Send the API request
                return self.http.get(self.gmapsURL, {
                    params:{
                        address:content
                    }
                }).then(function(resp) {
                    // Error state for no results found;
                    if(resp.data[0].status != 'OK') {
                        self.metadata.display_text = self.error_question;
                        self.metadata.locationstate = 'initial';
                        return;
                    }
                    // If more than one result is found, list them
                    if(resp.data[0].results.length > 1) {
                        var addresses = self.extract_from_gmaps(resp.data[0]
                            .results);
                        self.metadata.pages = self.generate_pages(addresses);
                        self.metadata.display_text =
                            self.metadata.pages[self.metadata.current_page]
                            .page_text;
                        self.metadata.locationstate = 'refinequestion';
                        return;
                    }
                    // If only one result is found
                    // TODO: Do something with the results

                });

            case 'refinequestion':
                // TODO: Make previous and next page selection work
                // TODO: Do something with the results
                return;
            default:
                return self.set_next_state(self.next, content);
        }
    });

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

        while(current_address_number < addresses.length) {
            while(current_option_number < self.options_per_page) {

                // Check for character limit
                if(current_page.length +
                   (current_option_number + '. ').length +
                   addresses[current_address_number].length +
                   ("n. " + self.next_text).length +
                   ("p. " + self.previous_text).length + 3 // For newlines
                   > self.characters_per_page)
                {
                    break;
                }

                // Add address to current page if limit isn't reached
                current_page += "\n" + current_option_number + '. ' +
                    addresses[current_address_number];
                page_options.push(addresses[current_address_number]);
                current_option_number += 1;
                current_address_number += 1;

                // If we reach the end of the address list.
                if(current_address_number >= addresses.length) {break;}
            }
            // Add footer text to end of page
            current_page += '\n' + 'n. ' + self.next_text;
            current_page += '\n' + 'p. ' + self.previous_text;
            // Add page and clear variables for next page
            pages.push({page_text:current_page, options:page_options});
            current_option_number = 1;
            page_options = [];
            current_page = self.refine_question_text + '\n';
        }
        return pages;
    };

    // This function takes the results from the Google Maps API and returns an
    // array of strings, each string the 'formatted_address' property from
    // the API.
    self.extract_from_gmaps = function(results) {
        var addresses = [];
        results.forEach(function(res) {
            addresses.push(res.formatted_address);
        });
        return addresses;
    };


    self.translate = function(i18n) {
        self.question_text = i18n(self.question_text);
        self.refine_question_text = i18n(self.refine_question_text);
        self.error_question = i18n(self.error_question);
    };

    self.display = function() {
        return self.metadata.display_text;
    };
    
});

this.LocationState = LocationState;
