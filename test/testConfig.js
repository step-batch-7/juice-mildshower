const assert = require("assert");
const config = require("../src/config");

describe("#getPath()", function() {
  it("should give confugured path if path is confugured using env variable", function() {
    const actualValue = config.getPath({ JS_STORE_PATH: "Configured Path" });
    const expectedValue = "Configured Path";
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give default path if path is not confugured using env variable", function() {
    const actualValue = config.getPath({});
    const expectedValue = "./beverageTransactions.json";
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("#getDateFunc()", function() {
  it("should give a func that gives configured date if date is configured using env variable", function() {
    const actualValue = config.getDateFunc({
      JS_DATE: "2019-12-01T13:19:41.464Z"
    })();
    const expectedValue = new Date("2019-12-01T13:19:41.464Z");
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give a func that gives current date obj if date is not configured using env variable", function() {
    const actualValue = config.getDateFunc({})();
    const expectedValue = new Date();
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
