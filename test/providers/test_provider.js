var assert = require('assert');

var vumigo = require('vumigo_v02');
var BaseError = vumigo.utils.BaseError;

var provider = require('../../lib/providers/provider');
var ProviderNotImplementedError = provider.ProviderNotImplementedError;

describe('ProviderNotImplementedError', function() {
    it('should extend BaseError', function() {
        var err = new ProviderNotImplementedError('coming soon');
        assert(err instanceof BaseError);
    });

    it('should have a name', function() {
        var err = new ProviderNotImplementedError('coming soon');
        assert.equal(err.name, 'ProviderNotImplementedError');
    });

    it('should have a message', function() {
        var err = new ProviderNotImplementedError('.foo not implemented');
        assert.equal(err.message, '.foo not implemented');
    });
});
