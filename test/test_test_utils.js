var assert = require("assert");
var AssertionError = assert.AssertionError;

var test_utils = require("../lib/test_utils");
var assert_address_result = test_utils.assert_address_result;

var providers = require("../lib/providers");
var AddressResult = providers.AddressResult;


describe("assert_address_result", function() {
    describe("should check the label", function() {
        it("and pass if it matches", function() {
            assert_address_result(
                new AddressResult("label", {}),
                "label", {});
        });

        it("and raise an AssertionError if it does not match", function() {
            assert.throws(function() {
                assert_address_result(
                    new AddressResult("bad label", {}),
                    "label", {});
            }, AssertionError);
        });
    });

    describe("should check the data", function() {
        it("and pass if it matches", function() {
            assert_address_result(
                new AddressResult("label", {data: "foo"}),
                "label", {data: "foo"});
        });

        it("and raise an AssertionError if it does not match", function() {
            assert.throws(function() {
                assert_address_result(
                    new AddressResult("label", {data: "bad"}),
                    "label", {data: "foo"});
            }, AssertionError);
        });
    });

    describe("should default the data based on the label", function() {
        it("and pass if it matches", function() {
            assert_address_result(
                new AddressResult("label", {formatted_address: "label"}),
                "label");
        });

        it("and raise an AssertionError if it does not match", function() {
            assert.throws(function() {
                assert_address_result(
                    new AddressResult("label", {formatted_address: "unexpected"}),
                    "label");
            }, AssertionError);
        });
    });

    describe("should check the type of the result", function() {
        it("and pass if it is AddressResult", function() {
            assert_address_result(
                new AddressResult("label", {}),
                "label", {});
        });

        it("and raise if it is not AddressResult", function() {
            assert.throws(function() {
                assert_address_result(
                    {label: "label", data: {}},
                    "label", {});
            }, AssertionError);
        });
    });
});
