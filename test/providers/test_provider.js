var assert = require('assert');

var vumigo = require('vumigo_v02');
var BaseError = vumigo.utils.BaseError;

var provider = require('../../lib/providers/provider');
var ProviderNotImplementedError = provider.ProviderNotImplementedError;
var AddressResult = provider.AddressResult;

describe('ProviderNotImplementedError', function() {
    it('should extend BaseError', function() {
        var err = new ProviderNotImplementedError('coming soon');
        assert(err instanceof BaseError);
    });

    it('should have a name', function() {
        var err = new ProviderNotImplementedError('coming soon');
        assert.strictEqual(err.name, 'ProviderNotImplementedError');
    });

    it('should have a message', function() {
        var err = new ProviderNotImplementedError('.foo not implemented');
        assert.strictEqual(err.message, '.foo not implemented');
    });
});

describe('AddressResult', function() {
    it('should have a label', function() {
        var addr = new AddressResult('2b Baker Street', {});
        assert.strictEqual(addr.label, '2b Baker Street');
    });

    it('should contain data', function() {
        var addr = new AddressResult('label', {'custom': 'data'});
        assert.deepEqual(addr.data, {'custom': 'data'});
    });
});
