var _ = require('lodash');



module.exports = function() {
    var fixtures = [];
    self = {};

    /**function:add_location(opts)

    Adds location data to the fixtures

    :param string opts.request_url:
        URL for the HTTP request. Defaults to
        ``"http://maps.googleapis.com/maps/api/geocode/json"``
    :param string opts.request:
        The address that is to be queried. Defaults to
        ``"Friend Street, South Africa"``.
    :param array_of_strings opts.address_list:
         An array of the list of `formatted_address`'s that should be sent in
         the response. If response_data is included, this will be ignored.
         Defaults to ``["Friend Street, Cape Town 7925, South Africa"]``
    :param object opts.response_data:
        An object that represents the response from the maps API

    Usage:
    Create an instance of

    .. code-block:: javascript

        locations = LocationState.testing()

    and then add the fixtures in

    .. code-block:: javascript

        locations.fixtures

    to the fixtures list beforeEach test.
    Then add locations during testing:

    .. code-block:: javascript

        locations.add_location({
            request:"New Street",
            address_list:["New Street 1", "New Street 2"]
        });

    */
    var add_location = function(opts) {

        _.defaults(opts, {
            mapping_service: "gmaps",
            request_url: ((opts.mapping_service === 'osmaps') ?
                "http://open.mapquestapi.com/nominatim/v1/search.php" :
                "http://maps.googleapis.com/maps/api/geocode/json"),
            request: "Friend Street, South Africa",
            address_list: ["Friend Street, Cape Town 7925, South Africa"]
        });

        if (opts.mapping_service === 'gmaps') {
            if(!opts.response_data) {
                opts.response_data = {};
                opts.response_data.status = "OK";
                opts.response_data.results = [];
                _.forEach(opts.address_list, function(addr) {
                    opts.response_data.results.push({'formatted_address':addr});
                });
            }

            var item = {};
            item.request = {};
            item.request.method = "GET";
            item.request.url = opts.request_url;
            item.request.params = {'address':opts.request};
            item.response = {};
            item.response.code = 200;
            item.response.data = opts.response_data;
            fixtures.push(item);

        } else if (opts.mapping_service === 'osmaps') {
            if(!opts.response_data) {
                opts.response_data = [];
                _.forEach(opts.address_list, function(addr) {
                    opts.response_data.push({'display_name':addr});
                });
            } else {
                opts.response_data = opts.response_data;
            }

            var osmaps_item = {};
            osmaps_item.request = {};
            osmaps_item.request.method = "GET";
            osmaps_item.request.url = opts.request_url;
            osmaps_item.request.params = {
                'q': opts.request,
                'format': 'json',
                'limit': '30',
                'bounded': '1',
                'addressdetails': '1',
                'viewbox': 'viewbox=-180.0%2C90.0%2C180.0%2C-90.0'
            };
            osmaps_item.response = {};
            osmaps_item.response.code = 200;
            osmaps_item.response.data = opts.response_data;
            fixtures.push(osmaps_item);
        }

    };

    /**function:add_locations(opts)

        Adds an array location data to the fixtures.

        :param array_of_objects opts_array:
            An array of opts

        Related: :meth:`add_location`
    */
    var add_locations = function(opts_array) {
        _.forEach(opts_array, add_location(opts));
    };

    self.add_location = add_location;
    self.add_locations = add_locations;
    self.fixtures = fixtures;

    return self;
};
