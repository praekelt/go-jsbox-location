var assert = require('assert');

var vumigo = require('vumigo_v02');
var JsonApi = vumigo.http.api.JsonApi;

var providers = require('../../lib/providers');
var Provider = providers.Provider;
var AddressResult = providers.AddressResult;
var GoogleMaps = providers.GoogleMaps;

describe('GoogleMaps', function() {
    it('should extend Provider', function() {
        var gm = new GoogleMaps();
        assert(gm instanceof Provider);
    });

    describe('.init()', function() {
        it('should create a JsonApi', function() {
            var gm = new GoogleMaps();
            var dummy_im = {};
            assert.strictEqual(gm.http, null);
            gm.init(dummy_im);
            assert(gm.http instanceof JsonApi);
        });
    });

    describe('extract_address_label', function() {
        it('the default should return formatted_address', function() {
            var gm = new GoogleMaps();
            var label = gm.extract_address_label({
                formatted_address: 'the label',
                other: 'something entirely different',
            });
            assert.strictEqual(label, 'the label');
        });

        it('should be overrideable', function() {
            var gm = new GoogleMaps({
                extract_address_label: function(r) {
                    return r.custom_label;
                },
            });
            var label = gm.extract_address_label({
                formatted_address: 'the ordinary label',
                custom_label: 'customised label',
            });
            assert.strictEqual(label, 'customised label');
        });
    });

    describe('extract_address_data', function() {
        it('the default should return formatted_address', function() {
            var gm = new GoogleMaps();
            var data = gm.extract_address_data({
                formatted_address: 'the address',
                other: 'something entirely different',
            });
            assert.deepEqual(data, {formatted_address: 'the address'});
        });

        it('should be overrideable', function() {
            var gm = new GoogleMaps({
                extract_address_data: function(r) {
                    return {custom: r.custom_data};
                },
            });
            var data = gm.extract_address_data({
                formatted_address: 'the address',
                custom_data: 'customised data',
            });
            assert.deepEqual(data, {custom: 'customised data'});
        });
    });

    describe('extract_address', function() {
        it('should have a default', function() {
            var gm = new GoogleMaps();
            var addr = gm.extract_address({
                formatted_address: 'the address',
                extraneous_field: 'extraneous value',
            });
            assert(addr instanceof AddressResult);
            assert.strictEqual(addr.label, 'the address');
            assert.deepEqual(addr.data, {formatted_address: 'the address'});
        });

        describe('should respect overrides of', function() {
            it('extract_address_label', function() {
                var gm = new GoogleMaps({
                    extract_address_label: function(r) {
                        return r.override;
                    },
                });
                var addr = gm.extract_address({
                    formatted_address: 'the address',
                    override: 'max override',
                });
                assert.strictEqual(addr.label, 'max override');
            });

            it('extract_address_data', function() {
                var gm = new GoogleMaps({
                    extract_address_data: function(r) {
                        return {custom: r.snowflake};
                    },
                });
                var addr = gm.extract_address({
                    formatted_address: 'the address',
                    snowflake: 'unique',
                });
                assert.deepEqual(addr.data, {custom: 'unique'});
            });
        });
    });
});
