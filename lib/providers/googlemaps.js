var _ = require('lodash');

var vumigo = require('vumigo_v02');
var JsonApi = vumigo.http.api.JsonApi;
var Extendable = vumigo.utils.Extendable;

var GoogleMaps = Extendable.extend(function (self, opts) {
    /**class:GoogleMaps(opts)

    An address search provider for Google Maps.

    :param string opts.api_url:
        The URL of the Google Maps geocode API. Defaults to
        'http://maps.googleapis.com/maps/api/geocode/json'.

    :param function opts.extract_address_label:
        Function that extracts a human-friendly label from a GoogleMaps
        API result. See :meth:`GoogleMaps.extract_address_label` for the
        function signature.

    :param function opts.extract_address_data:
        Function that extracts data to store on a contact from a GoogleMaps
        API result. See :meth:`GoogleMaps.extract_address_data` for the
        function signature.
    */

    // Defaults
    opts = _.defaults(opts || {}, {
        api_url: 'http://maps.googleapis.com/maps/api/geocode/json',
        extract_address_label: null,
        extract_address_data: null,
    });

    Extendable.call(self);

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

        Extracts a human-friendly display name for a Google Maps location
        result.

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

        Takes a result from the Google Maps API and returns an address.

        Calls :meth:`GoogleMaps.extract_address_label` and
        :meth:`GoogleMaps.extract_address_data` for the label and data
        respectively.
        */
        return {
            label: self.extract_address_label(result),
            data: self.extract_address_data(result),
        };
    };

    self.search = function(query_text) {
        /**:GoogleMaps.search(query_text)

        Return an ordered list of locations matching the query via a
        promise that is fulfilled when the search results are ready.

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

this.GoogleMaps = GoogleMaps;
