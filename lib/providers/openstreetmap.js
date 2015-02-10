var _ = require('lodash');

var vumigo = require('vumigo_v02');
var JsonApi = vumigo.http.api.JsonApi;

var provider = require('./provider');
var Provider = provider.Provider;
var AddressResult = provider.AddressResult;
var FixtureParameterMissingError = provider.FixtureParameterMissingError;

var OpenStreetMap = Provider.extend(function (self, opts) {
    /**class:OpenStreetMap(opts)

    An address search provider for Open Street Map.

    :param string opts.api_url:
        The URL of the Open Street Map API. Defaults to
        'http://open.mapquestapi.com/nominatim/v1/search.php'.

    :param function opts.extract_address_label:
        Function that extracts a human-friendly label from an Open Street Map
        API result. See :meth:`OpenStreetMap.extract_address_label` for the
        function signature and default implementation.

    :param function opts.extract_address_data:
        Function that extracts data to store on a contact from an Open Street Map
        API result. See :meth:`OpenStreetMap.extract_address_data` for the
        function signature and default implementation.

    :param boolean hard_boundary:
        Whether to limit results to a fixed bounding box. Defaults to `true`.

    :param integer address_limit:
        Maximum number of search results to return. Defaults to `30`.

    :param array bounding_box:
        Bounding box to limit search results to. Should be provided in the form
        ``[left_edge, top_edge, right_edge, bottom_edge]``, e.g.
        ``["-18.3273", "-33.7652", "18.937", "-34.3329"]`` for South Africa.
        Defaults to ``["-180.0", "90.0", "180.0", "-90.0"]`` for worldwide
        search.

    See http://open.mapquestapi.com/nominatim/ for a complete description of the
    Open Street Map search API.
    */

    // Defaults
    opts = _.defaults(opts || {}, {
        api_url: 'http://open.mapquestapi.com/nominatim/v1/search.php',
        extract_address_label: null,
        extract_address_data: null,
        hard_boundary: true,
        address_limit: 30,
        bounding_box: ["-180.0", "90.0", "180.0", "-90.0"],
    });

    Provider.call(self);

    // Attributes
    self.api_url = opts.api_url;
    self.hard_boundary = opts.hard_boundary;
    self.address_limit = opts.address_limit;
    self.bounding_box = opts.bounding_box;
    self.http = null;

    self.init = function(im) {
        /**:OpenStreetMap.init()

        Initialization function invoked during state initialization.

        :param InteractionMachine im:
            The state's :class:`InteractionMachine` instance.
        */
        self.http = new JsonApi(im);
    };

    self.extract_address_label = opts.extract_address_label || function(result) {
        /**:OpenStreetMap.extract_address_label(result)

        Returns the value of ``result.display_name`` as a human-friendly
        display name for an Open Street Map location result.

        May be overriden using the ``extract_address_label`` class option.

        :param object result:
            A location result from the Open Street Map API.

        :return string:
            The label to display for this result.
        */
        return result.display_name;
    };

    self.extract_address_data = opts.extract_address_data || function(result) {
        /**:OpenStreetMap.extract_address_data(result)

        Extracts address data to store on a contact when an address is
        selected. See :meth:`LocationState.store_contact_data` for a
        description of how this data is stored.

        Returns the object::

            {
                formatted_address: result.display_name
            }

        May be overriden using the ``extract_address_data`` class option.

        :param object result:
            A location result from the Open Street Map API.

        :returns object:
            An object of key-value pairs to store in contact data.
        */
        return {
            formatted_address: result.display_name,
        };
    };

    self.extract_address = function(result) {
        /**:OpenStreetMap.extract_address(result)

        Takes a result from the OpenStreetMap API and returns a
        :class:`AddressResult` for it.

        :param object result:
            A raw OpenStreetMap result.

        :returns:
            An :class:`Addressresult`.

        Calls :meth:`OpenStreetMap.extract_address_label` and
        :meth:`OpenStreetMap.extract_address_data` for the label and data
        respectively.
        */
        return new AddressResult(
            self.extract_address_label(result),
            self.extract_address_data(result)
        );
    };

    self.api_params = function(query_text) {
        return {
            format: 'json',
            q: query_text,
            addressdetails: 1,
            bounded: (self.hard_boundary === true ? 1 : 0),
            limit: self.address_limit,
            viewbox: "viewbox=" + self.bounding_box.join('%2C')
        };
    };

    self.search = function(query_text) {
        /**:OpenStreetMap.search(query_text)

        Return an ordered list of locations matching the query via a
        promise that is fulfilled when the search results are ready.

        Returns an empty list if an error occurs while accessing the
        Open Street Map API.

        :param string query_text:
            The search query.

        :return:
            A promise that yields the list of search results.
        */
        return self.http.get(self.api_url, {
            params: self.api_params(query_text),
        }).then(function (resp) {
            if (!resp.data || resp.data.length === 0) {
                return [];
            }
            return resp.data.map(self.extract_address);
        });
    };
});

OpenStreetMap.fixture = function(opts) {
    /**function:OpenStreetMap.fixture(opts)

    Returns an HTTP resource fixture for an OpenStreetMap location query.

    :param string opts.query:
        The address that is to be queried. Required.

    :param array_of_strings opts.address_list:
         An array of the list of `formatted_address`'s that should be sent in
         the response. If response_data is included, this will be ignored.
         Defaults to ``[]``.

    :param string opts.request_url:
        URL for the HTTP request. Defaults to
        ``"http://open.mapquestapi.com/nominatim/v1/search.php"``.

    :param array_of_objects opts.response_data:
        An array of objects that represents the response from the gmaps API.

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
    });

    if (typeof opts.query === 'undefined') {
        throw new FixtureParameterMissingError(
            "'query' option is required when creating an OpenStreetMap fixture."
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
                format: "json",
                q: opts.query,
                addressdetails: "1",
                bounded: "1",
                limit: "30",
                viewbox: "viewbox=-180.0%2C90.0%2C180.0%2C-90.0",
            },
        },
        response: {
            code: 200,
            data: opts.response_data,
        },
    };
};

this.OpenStreetMap = OpenStreetMap;
