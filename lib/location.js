var _ = require('lodash');

var vumigo = require('vumigo_v02');
var states = vumigo.states;
var State = states.State;
var JsonApi = vumigo.http.api.JsonApi;
var testing = require('./testing');

var LocationState = State.extend(function (self, name, opts) {
    /**class:LocationState(name, opts)

    A state which requests a location from the user, and sets the user data
    through getting the location data from the API. It may also request a
    second prompt from the user to further refine the location if the first
    prompt wasn't clear enough.

    Helpful information on the OpenStreetMaps API used can be found at:
    ``http://open.mapquestapi.com/nominatim/``

    :param string name:
        name used to identify and refer to the state
    :param string_or_LazyText opts.question:
        The question to first display to the user. Defaults to
        ``What is your address?``.
    :param string_or_LazyText opts.refine_question:
        The question to display to the user when selecting a location from a
        list if the first search query wasn't clear enough. Defaults to
        ``Please select your location from the following:``
    :param string_or_LazyText opts.error_question:
        The question to display to the user when no locations are found for
        their search term. It will keep requesting until results are found.
        Defaults to ``Error: No results for your search term. Please try another
        search term.``
    :param string opts.mapping_service:
        The name of the mapping service that we are performing api calls to.
        Currently accepts 'gmaps' (Google Maps) and 'osmaps' (OpenStreetMaps).
        Defaults to 'gmaps' for compatibility with existing code.
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
    :param array opts.store_fields:
        An array of field names from the maps API results that should be
        stored against the contact. Defaults to ``['formatted_address']`` for
        Google Maps and ``['display_name']`` for OpenStreetMaps. Data is stored
        as a string representation of the object in the ``location`` field in
        the contact store.
        Examples for Google Maps:
        ``address_components``
        ``address_components.long_name``
        ``address_components.short_name``
        ``address_components.types``
        ``formatted_address``
        ``geometry``
        ``geometry.bounds``
        ``geometry.bounds.northeast``
        ``geometry.bounds.northeast.lat``
        ``geometry.bounds.northeast.lng``
        ``geometry.bounds.southwest``
        ``geometry.bounds.southwest.lat``
        ``geometry.bounds.southwest.lng``
        ``geometry.location``
        ``geometry.location.lat``
        ``geometry.location.lng``
        ``geometry.location_type``
        ``geometry.viewport``
        ``geometry.viewport.northeast``
        ``geometry.viewport.northeast.lat``
        ``geometry.viewport.northeast.lng``
        ``geometry.viewport.southwest``
        ``geometry.viewport.southwest.lat``
        ``geometry.viewport.southwest.lng``
        ``types``
        Examples for OpenStreetMaps:
        ``place_id``
        ``licence``
        ``osm_type``
        ``osm_id``
        ``boundingbox``
        ``lat``
        ``lon``
        ``display_name``
        ``class``
        ``type``
        ``importance``
        ``address``
        ``address.road``
        ``address.suburb``
        ``address.city_district``
        ``address.city``
        ``address.county``
        ``address.state``
        ``address.postcode``
        ``address.country``
        ``address.country_code``
    :param string opts.namespace:
        The namespace to use when storing the contact details, ie.
        ``location:....``. Defaults to ``location``.
    :param object opts.events:
        Optional event name-listener mappings to bind.
    :param string opts.country_code:
        Optional country code that when supplied sets the bounding box to the
        limits of that country. Currently only works for South Africa ('za').
    :param array opts.bounding_box:
        Optional list of coordinates that limits the scope of the api location
        search to the defined box. Should be provided in the form
        ``[left_edge, top_edge, right_edge, bottom_edge]`` e.g.
        ``["-18.3273", "-33.7652", "18.937", "-34.3329"]`` for South Africa.
        Defaults to ``["-180.0", "90.0", "180.0", "-90.0"]`` for worldwide search.
        If opts.country_code is provided it will override this parameter.
    :param boolean opts.hard_boundary:
        Optional parameter that indicates whether the bounding_box limits
        should be regarded as hard limits (i.e. show only results that fall
        within the box's limits). If set to ``false``, results that fall inside
        the bounding_box perimeters will be treated as preferred and returned
        first. Defaults to ``true``.
    :param integer opts.address_limit:
        Optional parameter that limits the number of returned results from the
        api search. Currently only works for OpenStreetMaps.  Defaults to ``30``.
    :param array opts.address_details:
        Highly recommended, though optional list of details for OpenStreetMaps
        that when passed in defines which address details will be displayed back
        to the user to select their address from (overrides ``display_name``).
        Defaults to ``[]``. Example:``['house_number', 'road', 'suburb', 'city',
        'state', 'postcode', 'country']``

    Example:

    .. code-block:: javascript

        self.states.add('states:example-locationState', function(name){
            return new LocationState(name, {
                question: ["Welcome to the location app.",
                    "What is your current address?"].join("\n"),
                next: "states:end",
                previous_text: "Prev",
                store_fields: ["geometry.location", "formatted_address"]
            });
        });

    */

    // Defaults
    opts = _.defaults(opts || {}, {
        next:null,
        skip:null,
        question:'What is your address?',
        refine_question:'Please select your location from the following:',
        error_question:[
                        'Error: No results for your search term.',
                        'Please try another search term.'
                        ].join('\n'),
        mapping_service:"gmaps",
        options_per_page:8,
        characters_per_page:160,
        next_text:"Next",
        previous_text:"Previous",
        skip_text:"Skip",
        retry_text:"Retry",
        store_fields: ((opts.mapping_service === 'osmaps') ?
            ['display_name'] : ['formatted_address']),
        namespace:'location',
        bounding_box:["-180.0", "90.0", "180.0", "-90.0"],
        hard_boundary:true,
        address_limit:30,
        address_details:[]
    });

    State.call(self, name, opts);

    // Store options
    self.next = opts.next;
    self.skip = opts.skip;
    self.question_text = opts.question;
    self.refine_question_text = opts.refine_question;
    self.error_question = opts.error_question;
    self.mapping_service = opts.mapping_service;
    self.options_per_page = opts.options_per_page;
    self.characters_per_page = opts.characters_per_page;
    self.next_text = opts.next_text;
    self.previous_text = opts.previous_text;
    self.skip_text = opts.skip_text;
    self.retry_text = opts.retry_text;
    self.store_fields = opts.store_fields;
    self.bounding_box = opts.bounding_box;
    self.gmapsURL = 'http://maps.googleapis.com/maps/api/geocode/json';
    self.osmapsURL = 'http://open.mapquestapi.com/nominatim/v1/search.php';
    self.country_boxes = {
        'za': ["16.4500", "-22.1278", "32.8917", "-34.8333"]
    };
    self.namespace = opts.namespace;
    self.address_details = opts.address_details;
    self.address_limit = opts.address_limit;
    self.hard_boundary = opts.hard_boundary;
    self.country_code = opts.country_code;

    self.init = function() {
        _.defaults(self.metadata, {locationstate:'initial'});
        self.http = new JsonApi(self.im);
        return self.im.
            contacts.for_user()
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
        return self.set_next_state(self.next);
    };

    // Dependant on API response, select next state
    self.handlers.initial = function(content) {
        // Send the API request
        if (self.mapping_service == 'osmaps') {
            return self.http
                .get(self.osmapsURL, {
                    params: self.build_osmaps_params(content)
                })
                .then(function(resp) {
                    // Error state for no results found;
                    if((!resp.data) || (resp.code !== 200) || (resp.data.length === 0)) {
                        self.metadata.display_text = self.error_question;
                        self.metadata.locationstate = 'initial';
                        return;
                    }
                    // If more than one result is found, list them
                    if(resp.data.length > 1) {
                        var addresses = self.extract_from_osmaps(resp.data);
                        self.metadata.pages = self.generate_pages(addresses);
                        self.metadata.display_text = self.metadata.pages
                            [self.metadata.current_page].page_text;
                        self.metadata.locationstate = 'refinequestion';
                        return;
                    }
                    // If only one result is found, store and enter next state
                    var address = self.extract_from_osmaps(resp.data);
                    self.store_contact_data(address[0]);
                    return self.set_next_state(self.next);
                });

        } else if (self.mapping_service == 'gmaps') {
            return self.http
                .get(self.gmapsURL, {
                    params:{
                        address:content
                    }
                })
                .then(function(resp) {
                    // Error state for no results found;
                    if(!resp.data || resp.data.status != 'OK') {
                        self.metadata.display_text = self.error_question;
                        self.metadata.locationstate = 'initial';
                        return;
                    }
                    // If more than one result is found, list them
                    if(resp.data.results.length > 1) {
                        var addresses = self.extract_from_gmaps(resp.data.results);
                        self.metadata.pages = self.generate_pages(addresses);
                        self.metadata.display_text = self.metadata.pages
                            [self.metadata.current_page].page_text;
                        self.metadata.locationstate = 'refinequestion';
                        return;
                    }
                    // If only one result is found, store and enter next state
                    var address = self.extract_from_gmaps(resp.data.results);
                    self.store_contact_data(address[0]);
                    return self.set_next_state(self.next);
                });
        }
    };

    // Handler for user response to refine location
    self.handlers.refinequestion = function(content) {
        var handler = {
            n: self.handlers.refinequestion.next,
            p: self.handlers.refinequestion.prev,
            s: self.handlers.refinequestion.skip,
            r: self.handlers.refinequestion.retry
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
        // Set page display_text
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

    // User selects skip
    self.handlers.refinequestion.skip = function(content) {
        return self.set_next_state(self.skip);
    };

    // User selects retry
    self.handlers.refinequestion.retry = function(content) {
        self.metadata.display_text = self.question;
        self.metadata.locationstate = 'initial';
        return;
    };

    // User selects location
    self.handlers.refinequestion.number = function(content) {
        if(isNaN(content)) { return; }
        // Store the selected address, and advance to next state
        var current_page_no = self.metadata.current_page;
        var address = self.metadata.pages[current_page_no].options[content-1];
        self.store_contact_data(address);
        return self.set_next_state(self.next);
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
        var footer = self.generate_standard_footer();
        var last_page_footer = self.generate_last_page_footer();
        var footer_length = Math.max(footer.length, last_page_footer.length);

        while(current_address_number < addresses.length) {

            while(current_option_number <= self.options_per_page) {
                var choice_text = self.format_choice(current_option_number,
                    addresses[current_address_number]);
                // Check for character limit
                if((current_page.length + choice_text.length + footer_length) >
                self.characters_per_page) {
                    // If a single result doesn't fit on a page, shorten that
                    // address to force it to fit.
                    if (current_option_number == 1) {
                        var available_chars = (self.characters_per_page -
                            current_page.length - footer_length - 3);
                        current_page += choice_text.substr(0, available_chars) +
                             "...";
                        page_options.push(addresses[current_address_number]);
                        current_address_number += 1;
                    }
                    break;
                }

                // Add address to current page if limit isn't reached
                current_page += choice_text;
                page_options.push(addresses[current_address_number]);
                current_option_number += 1;
                current_address_number += 1;

                // If we reach the end of the address list.
                if(current_address_number >= addresses.length) {break;}
            }

            // Add footer text to end of page
            if (current_address_number >= addresses.length) {
                current_page += last_page_footer;
            } else {
                current_page += footer;
            }

            // Add page and clear variables for next page
            pages.push({page_text:current_page, options:page_options});
            current_option_number = 1;
            page_options = [];
            current_page = self.refine_question_text;
        }
        return pages;
    };

    self.format_choice = function(number, address) {
        if (address.formatted_address) {
            return '\n' + number + '. ' + address.formatted_address;
        } else {
            return '\n' + number + '. ' + address.display_name;
        }
    };

    self.generate_standard_footer = function() {
        var skip_footer;
        if (self.skip !== null) {
            skip_footer = '\n' + 's. '+self.skip_text;
        } else {
            skip_footer = '';
        }
        return '\n' + 'n. '+self.next_text +
               '\n' + 'p. '+self.previous_text +
               skip_footer;
    };

    self.generate_last_page_footer = function() {
        var skip_footer;
        if (self.skip !== null) {
            skip_footer = '\n' + 's. '+self.skip_text;
        } else {
            skip_footer = '';
        }
        return '\n' + 'r. '+self.retry_text +
               '\n' + 'p. '+self.previous_text +
               skip_footer;
    };

    // This function takes the results from the Google Maps API and returns an
    // array of strings, each string the 'formatted_address' property from
    // the API.
    self.extract_from_gmaps = function(results) {
        var addresses = [];
        results.forEach(function(res) {
            var result = {};        // Used to generate single result object
            self.store_fields.forEach(function(field) {
                result[field]=self.extract_object(res, field);
            });
            // Ensure that formatted_address is included as it is needed to
            // generate the pages.
            if(!result.formatted_address) {
                result.formatted_address=res.formatted_address;
            }
            addresses.push(result);
        });
        return addresses;
    };

    // This function takes the results from the OpenStreetMaps API and returns
    // an array of strings, currently just containing a 'formatted_address'
    // field constructed from the 'address_details' fields.
    self.extract_from_osmaps = function(results) {
        var addresses = [];
        results.forEach(function(res) {
            var result = {};  // Used to generate single result object
            self.store_fields.forEach(function(field) {
                result[field]=self.extract_object(res, field);
            });
            // Override display_name if address_details are provided
            if (self.address_details.length !== 0) {
                var addr_detail_list = [];
                self.address_details.forEach(function(detail) {
                    if (res.address[detail] !== undefined) {
                        addr_detail_list.push(res.address[detail]);
                    }
                });
                result.display_name = addr_detail_list.join(', ');
            }
            // Ensure that display_name is included even if excluded from
            // store_fields as it is needed to generate the pages.
            if(!result.display_name) {
                result.display_name = res.display_name;
            }
            addresses.push(result);
        });
        return addresses;
    };

    // Takes a field as a string, eg 'foo.bar.baz', and extracts the actual
    // object, ie. obj.foo.bar.baz
    self.extract_object = function(obj, field) {
        var split = field.split('.');
        split.forEach(function(value) {
            obj = obj[value];
            if(obj === undefined) {
                var error_msg = [ "Object", field,
                              "was not found in the API response"].join(' ');
                throw new Error(error_msg);
            }
        });
        return obj;
    };

    // Stores the address data to the contact. Stores the string 'data' in the
    // ContactStore
    self.store_contact_data = function(data) {
        // Remove formatted_address or display_name if it was not requested
        if (self.mapping_service === 'gmaps' &&
              self.store_fields.indexOf('formatted_address') === -1) {
                delete data.formatted_address;
        } else if (self.mapping_service === 'osmaps' &&
              self.store_fields.indexOf('display_name') === -1) {
                delete data.display_name;
        }
        data = self.flatten_object(data);
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

    self.get_viewbox = function() {
        if (self.country_code) {
            self.bounding_box = self.country_boxes[self.country_code];
        }
        return "viewbox=" + self.bounding_box.join('%2C');
    };

    self.build_osmaps_params = function(content) {
        params = {
            format: 'json',
            q: content,
            addressdetails: 1,
            bounded: ((self.hard_boundary === true) ? 1 : 0),
            limit: self.address_limit,
            viewbox: self.get_viewbox()
        };
        return params;
    };

});

this.LocationState = LocationState;
this.LocationState.testing = testing;
