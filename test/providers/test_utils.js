var assert = require('assert');

var vumigo = require('vumigo_v02');
var BaseError = vumigo.utils.BaseError;
var Extendable = vumigo.utils.Extendable;
var test_utils = vumigo.test_utils;

var location = require('../../lib');
var provider_utils = location.providers.utils;
var ProviderNotImplementedError = provider_utils.ProviderNotImplementedError;
var AddressResult = provider_utils.AddressResult;
var Provider = provider_utils.Provider;

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

describe('Provider', function() {
    it('should be extendable', function() {
        var p = new Provider();
        assert(p instanceof Extendable);
    });

    describe('.init()', function() {
        it('should have a default implementation', function() {
            var p = new Provider();
            var dummy_im = {};
            p.init(dummy_im);
        });
    });

    describe('.search()', function() {
        it('should raise ProviderNotImplementedError', function() {
            var p = new Provider();
            assert.throws(function () {
                p.search("corner of smith and long");
            }, ProviderNotImplementedError);
        });

        it('should provide a suitable error message', function() {
            var p = new Provider();
            var e = test_utils.catch_err(function() {
                p.search('the middle of');
            });
            assert.strictEqual(e.message, '.search not implemented');
        });
    });
});
