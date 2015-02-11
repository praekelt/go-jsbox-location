var _ = require('lodash');

var provider_utils = require('../utils');
var FixtureParameterMissingError = provider_utils.FixtureParameterMissingError;

function fixture(opts) {
    /**function:fixture(opts)

    Returns an HTTP resource fixture for a GoogleMaps location query.

    :param string opts.query:
        The address that is to be queried. Required.

    :type opts.address_list: array of strings
    :param opts.address_list:
         A list of ``formatted_address``es that should be sent in the response.
         If response_data is included, this will be ignored.
         Defaults to ``[]``.

    :param string opts.request_url:
        URL for the HTTP request. Defaults to
        ``"http://maps.googleapis.com/maps/api/geocode/json"``.

    :param object opts.response_data:
        An that object that represents the response from the Google Maps API.
        This overrides the response data generated from ``opts.address_list``.
        Example response data:

        .. code-block:: javascript

           {
               status: "OK",
               results: [
                   {
                       formatted_address: "1 Baker Street",
                   },
                   {
                       formatted_address: "2 Baker Street",
                   },
               ],
           }

    Usage:

    .. code-block:: javascript

        tester
            .setup(function(api) {
                api.http.fixtures.add(
                    GoogleMaps.fixture({
                        request: "New Street",
                        address_list: [
                            "New Street 1", "New Street 2",
                        ],
                    });
                );
            });

    */
    opts = _.defaults(opts || {}, {
        request_url: "http://maps.googleapis.com/maps/api/geocode/json",
        address_list: [],
    });

    if (typeof opts.query === 'undefined') {
        throw new FixtureParameterMissingError(
            "'query' option is required when creating a GoogleMaps fixture."
        );
    }

    if (!opts.response_data) {
        opts.response_data = {
            status: "OK",
            results: _.map(opts.address_list, function(address) {
                return {formatted_address: address};
            }),
        };
    }

    return {
        request: {
            method: "GET",
            url: opts.request_url,
            params: {'address': opts.query},
        },
        response: {
            code: "200",
            data: opts.response_data,
        },
    };
}

this.fixture = fixture;
