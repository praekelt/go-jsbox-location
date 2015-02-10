var _ = require('lodash');

var vumigo = require('vumigo_v02');
var JsonApi = vumigo.http.api.JsonApi;

var provider = require('./provider');
var Provider = provider.Provider;
var AddressResult = provider.AddressResult;
var FixtureParameterMissingError = provider.FixtureParameterMissingError;

var GoogleMaps = Provider.extend(function (self, opts) {
    /**class:GoogleMaps(opts)

    An address search provider for Google Maps.

    :param string opts.api_url:
        The URL of the Google Maps geocode API. Defaults to
        'http://maps.googleapis.com/maps/api/geocode/json'.

    :param function opts.extract_address_label:
        Function that extracts a human-friendly label from a GoogleMaps
        API result. See :meth:`GoogleMaps.extract_address_label` for the
        function signature and default implementation.

    :param function opts.extract_address_data:
        Function that extracts data to store on a contact from a GoogleMaps
        API result. See :meth:`GoogleMaps.extract_address_data` for the
        function signature and default implementation.
    */

    // Defaults
    opts = _.defaults(opts || {}, {
        api_url: 'http://maps.googleapis.com/maps/api/geocode/json',
        extract_address_label: null,
        extract_address_data: null,
    });

    Provider.call(self);

    // Attributes
    self.api_url = opts.api_url;
    self.http = null;

    self.init = function(im) {
        /**:GoogleMaps.init()

        Initialization function invoked during state initialization.

        :param InteractionMachine im:
            The state's :class:`InteractionMachine` instance.
        */
        self.http = new JsonApi(im);
    };

    self.extract_address_label = opts.extract_address_label || function(result) {
        /**:GoogleMaps.extract_address_label(result)

        Returns the value of ``result.formatted_address`` as a
        human-friendly display name for a Google Maps location result.

        May be overriden using the ``extract_address_label`` class option.

        :param object result:
            A location result from the Google Maps API.

        :return string:
            The label to display for this result.
        */
        return result.formatted_address;
    };

    self.extract_address_data = opts.extract_address_data || function(result) {
        /**:GoogleMaps.extract_address_data(result)

        Extracts address data to store on a contact when an address is
        selected. See :meth:`LocationState.store_contact_data` for a
        description of how this data is stored.

        Returns the object::

            {
                formatted_address: result.formatted_address
            }

        May be overriden using the ``extract_address_data`` class option.

        :param object result:
            A location result from the Google Maps API.

        :returns object:
            An object of key-value pairs to store in contact data.
        */
        return {
            formatted_address: result.formatted_address,
        };
    };

    self.extract_address = function(result) {
        /**:GoogleMaps.extract_address(result)

        Takes a result from the Google Maps API and returns a
        :class:`AddressResult` for it.

        :param object result:
            A raw GoogleMaps result.

        :returns:
            An :class:`Addressresult`.

        Calls :meth:`GoogleMaps.extract_address_label` and
        :meth:`GoogleMaps.extract_address_data` for the label and data
        respectively.
        */
        return new AddressResult(
            self.extract_address_label(result),
            self.extract_address_data(result)
        );
    };

    self.search = function(query_text) {
        /**:GoogleMaps.search(query_text)

        Return an ordered list of locations matching the query via a
        promise that is fulfilled when the search results are ready.

        Returns an empty list if an error occurs while accessing the
        GoogleMaps API.

        :param string query_text:
            The search query.

        :return:
            A promise that yields the list of search results.
        */
        return self.http.get(self.api_url, {
            params: {address: query_text}
        }).then(function (resp) {
            if (!resp.data || resp.data.status != 'OK') {
                return [];
            }
            return resp.data.results.map(self.extract_address);
        });
    };
});

GoogleMaps.fixture = function(opts) {
    /**function:GoogleMaps.fixture(opts)

    Returns an HTTP resource fixture for a GoogleMaps location query.

    :param string opts.query:
        The address that is to be queried. Required.

    :param array_of_strings opts.address_list:
         An array of the list of `formatted_address`'s that should be sent in
         the response. If response_data is included, this will be ignored.
         Defaults to ``[]``.

    :param string opts.request_url:
        URL for the HTTP request. Defaults to
        ``"http://maps.googleapis.com/maps/api/geocode/json"``.

    :param array_of_objects opts.response_data:
        An array of objects that represents the response from the gmaps API.

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
};

this.GoogleMaps = GoogleMaps;
