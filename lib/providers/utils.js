var vumigo = require('vumigo_v02');
var Extendable = vumigo.utils.Extendable;
var BaseError = vumigo.utils.BaseError;


var ProviderNotImplementedError = BaseError.extend(function (self, message) {
    /**class:ProviderNotImplementedError

    Error raised when a method on a provider has not been implemented.

    :param string message:
        An explanation of which method was not implemented.
    */
    self.name = 'ProviderNotImplementedError';
    self.message = message;
});


var FixtureParameterMissingError = BaseError.extend(function (self, message) {
    /**class:FixtureParameterMissingError

    Error raised when a parameter required to create a fixture was not
    provided.

    :param string message:
        An explanation of which parameter was not provided.
    */
    self.name = 'FixtureParameterMissingError';
    self.message = message;

});


var AddressResult = Extendable.extend(function(self, label, data) {
    /**class:AddressResult

    A result returned by ``:meth:Provider.search``.

    :param string label:
        A human-friendly label for the search result.

    :param object data:
        A map of key-value pairs to store on a person's contact object if they
        select this result. See :meth:`LocationState.store_contact_data` for a
        description of how this data is stored.
    */
    self.label = label;
    self.data = data;
});

var Provider = Extendable.extend(function (self) {
    /**class:Provider()

    A base class for address search providers.

    Extensions to this class should implement :meth:`init` and :meth:`search`.
    */

    Extendable.call(self);

    self.init = function(im) {
        /**:Provider.init()

        Initialization function invoked during state initialization.

        :param InteractionMachine im:
            The state's :class:`InteractionMachine` instance.

        :return:
            May return a promise that fires once initialization is complete.
        */
    };

    self.search = function(query_text) {
        /**:Provider.search(query_text)

        Return an ordered list of locations matching the query via a
        promise that is fulfilled when the search results are ready.

        :param string query_text:
            The search query.

        :return:
            A promise that yields the list of :class:`AddressResult`
            instances.
        */
        throw new ProviderNotImplementedError(".search not implemented");
    };
});

this.ProviderNotImplementedError = ProviderNotImplementedError;
this.FixtureParameterMissingError = FixtureParameterMissingError;
this.Provider = Provider;
this.AddressResult = AddressResult;
