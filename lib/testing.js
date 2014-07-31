var _ = require('lodash');

var fixture_list = [];

module.exports.fixtures = function() {
    return fixture_list;
};


/**function:add_location(opts)

    Adds location data to the fixtures

    :param string opts.request_url:
        URL for the HTTP request. Defaults to
        `"http://maps.googleapis.com/maps/api/geocode/json"`
    :param string opts.request:
        The address that is to be queried. Defaults to
        `"Friend Street, South Africa"`.
    :param array_of_strings opts.address_list
         An array of the list of `formatted_address`'s that should be sent in
         the response. If response_data is included, this will be ignored.
         Defaults to `["Friend Street, Cape Town 7925, South Africa"]`
    :param array_of_objects opts.response_data
        An array of objects that represents the response from the gmaps API

    Usage:
    Add `LocationState.testing.fixtures()` to your fixtures list during setup.
    Then add locations during testing:
    ```
    LocationState.testing.add_location({
                request:"New Street",
                address_list:["New Street 1", "New Street 2"]
            });
    ```
**/
var add_location = function(opts) {
    _.defaults(opts, {
        request_url: "http://maps.googleapis.com/maps/api/geocode/json",
        request: "Friend Street, South Africa",
        address_list: ["Friend Street, Cape Town 7925, South Africa"]
    });

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
    item.response.code = "200";
    item.response.data = [opts.response_data];
    fixture_list.push(item);
};

/**function:add_location(opts)

    Adds an array location data to the fixtures.

    :param array_of_objects opts_array
        An array of opts

    Related: `add_location`
**/

var add_locations = function(opts_array) {
    _.forEach(opts_array, add_location(opts));
};

module.exports.add_location = add_location;
module.exports.add_locations = add_locations;