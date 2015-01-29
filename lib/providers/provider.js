var vumigo = require('vumigo_v02');
var Extendable = vumigo.utils.Extendable;
var BaseError = vumigo.utils.BaseError;


var ProviderNotImplementedError = BaseError.extend(function (self, message) {
    /**class:ProviderNotImplementedError

    Error raised when a method on a provider has not been implemented.

    :param string message:
        An explanation of which method was not implemented.
    */
    BaseError.call(self, message);
});


var Provider = Extendable.extend(function (self) {
    /**class:Provider()

    An base class for address search providers.

    Extensions to this class should implement :meth:`init` and :meth:`search`.
    */

    Extendable.call(self);

    self.init = function(im) {
        /**:Provider.init()

        Initialization function invoked during state initialization.

        :param InteractionMachine im:
            The state's :class:`InteractionMachine` instance.
        */
    };

    self.search = function(query_text) {
        /**:Provider.search(query_text)

        Return an ordered list of locations matching the query via a
        promise that is fulfilled when the search results are ready.

        :param string query_text:
            The search query.

        :return:
            A promise that yields the list of search results.
        */
        throw new ProviderNotImplementedError(".search not implemented");
    };
});

this.Provider = Provider;
