const handleInput = require("../src/handleInput.js");
const assert = require("assert");

describe("parse", function() {
  it("should give object with proper aguements after parsing ", function() {
    const actualValue = handleInput.parse([
      "--save",
      "--beverage",
      "Orange",
      "--qty",
      "4",
      "--empId",
      "25343"
    ]);
    const expectedValue = {
      command: "--save",
      beverage: "Orange",
      qty: 4,
      empId: "25343"
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
