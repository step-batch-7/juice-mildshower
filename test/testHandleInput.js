const handleInput = require("../src/handleInput.js");
const assert = require("assert");

describe("#parse()", function() {
  it("should give object with proper aguements if correct format is given", function() {
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
      empId: "25343",
      validation: true
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give validation false if enough options are not given with -save", function() {
    const actualValue = handleInput.parse([
      "--save",
      "--beverage",
      "Orange",
      "--qty",
      "4"
    ]);
    const expectedValue = {
      validation: false
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give validation false if enough options are not given with -query", function() {
    const actualValue = handleInput.parse(["--query"]);
    const expectedValue = {
      validation: false
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give validation false if wrong command is given", function() {
    const actualValue = handleInput.parse(["--abc"]);
    const expectedValue = {
      validation: false
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give validation false if command is given in between other options", function() {
    const actualValue = handleInput.parse([
      "--qty",
      "3",
      "--query",
      "--empId",
      "123"
    ]);
    const expectedValue = {
      validation: false
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give validation false if beverage choice is empty Str", function() {
    const actualValue = handleInput.parse([
      "--save",
      "--qty",
      "2",
      "--empId",
      "1234",
      "-beverage",
      ""
    ]);
    const expectedValue = {
      validation: false
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give validation false if qty choice is wrong", function() {
    const actualValue = handleInput.parse([
      "--save",
      "--qty",
      "abc",
      "--empId",
      "1234",
      "-beverage",
      ""
    ]);
    const expectedValue = {
      validation: false
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give validation false if empId choice is wrong", function() {
    const actualValue = handleInput.parse([
      "--save",
      "--qty",
      "12",
      "--empId",
      "abcd",
      "-beverage",
      ""
    ]);
    const expectedValue = {
      validation: false
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give validation false if date format is wrong", function() {
    const actualValue = handleInput.parse(["--query", "--date", "2019,02,12"]);
    const expectedValue = {
      validation: false
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give validation false if date bound is wrong", function() {
    const actualValue = handleInput.parse(["--query", "--date", "2019-02-29"]);
    const expectedValue = {
      validation: false
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
