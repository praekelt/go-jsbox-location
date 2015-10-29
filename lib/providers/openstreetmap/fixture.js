var _ = require('lodash');

var provider_utils = require('../utils');
var FixtureParameterMissingError = provider_utils.FixtureParameterMissingError;

function fixture(opts) {
    /**function:fixture(opts)

    Returns an HTTP resource fixture for an OpenStreetMap location query.

    :param string opts.key:
        The API key to use for requests. Required.

    :param string opts.query:
        The address that is to be queried. Required.

    :type opts.address_list: array of strings
    :param opts.address_list:
         A list of ``display_name``s that should be sent in the response. If
         response_data is included, this will be ignored. Defaults to ``[]``.

    :param boolean hard_boundary:
        Whether the request should limit results to a fixed bounding box.
        Defaults to ``true``.

    :param integer address_limit:
        The maximum number of search results that should be requested. Defaults
        to ``30``.

    :param array bounding_box:
        The bounding box to submit in the search request. Should be provided
        in the form ``[left_edge, top_edge, right_edge, bottom_edge]``, e.g.
        ``["-18.3273", "-33.7652", "18.937", "-34.3329"]`` for South Africa.
        Defaults to ``["-180.0", "90.0", "180.0", "-90.0"]`` for worldwide
        search.

    :param string opts.request_url:
        URL for the HTTP request. Defaults to
        ``"http://open.mapquestapi.com/nominatim/v1/search.php"``.

    :param object opts.response_data:
        An object that represents the response from the OpenStreetMap API.
        This overrides the response data generated from ``opts.address_list``.
        Example response data:

        .. code-block:: javascript

           [
               {
                   display_name: "1 Baker Street",
               },
               {
                   display_name: "2 Baker Street",
               },
           ]

    Usage:

    .. code-block:: javascript

        tester
            .setup(function(api) {
                api.http.fixtures.add(
                    OpenStreetMap.fixture({
                        request: "New Street",
                        address_list: [
                            "New Street 1", "New Street 2",
                        ],
                    });
                );
            });

    */
    opts = _.defaults(opts || {}, {
        request_url: "http://open.mapquestapi.com/nominatim/v1/search.php",
        address_list: [],
        hard_boundary: true,
        address_limit: 30,
        bounding_box: ["-180.0", "90.0", "180.0", "-90.0"],
    });

    if (typeof opts.query === 'undefined') {
        throw new FixtureParameterMissingError(
            "'query' option is required when creating an OpenStreetMap fixture."
        );
    }

    if (typeof opts.key === 'undefined') {
        throw new FixtureParameterMissingError(
            "'key' option is required when creating an OpenStreetMap fixture."
        );
    }

    if (!opts.response_data) {
        opts.response_data = _.map(opts.address_list, function(address) {
                return {display_name: address};
        });
    }

    return {
        request: {
            method: "GET",
            url: opts.request_url,
            params: {
                key: opts.key,
                format: "json",
                q: opts.query,
                addressdetails: "1",
                bounded: (opts.hard_boundary === true ? "1" : "0"),
                limit: opts.address_limit.toString(),
                viewbox: opts.bounding_box.join(',')
            },
        },
        response: {
            code: 200,
            data: opts.response_data,
        },
    };
}

this.fixture = fixture;
