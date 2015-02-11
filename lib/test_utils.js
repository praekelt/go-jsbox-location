var assert = require("assert");

var providers = require("./providers");
var AddressResult = providers.utils.AddressResult;


function assert_address_result(result, label, data) {
    /**function:assert_address_result(result, label, data)

    :param object result:
        The result object assert on.

    :param string label:
        The expected label.

    :param object data:
        The expected data. Defaults to ``{formatted_address: label}``.
    */
    if (typeof data === 'undefined') {
        data = {formatted_address: label};
    }
    assert.deepEqual(result, new AddressResult(label, data));
    assert(result instanceof AddressResult);
}

this.assert_address_result = assert_address_result;
