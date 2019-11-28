const handleInput = require("../src/handleInput.js");
const assert = require("assert");

describe("#parse()", function() {
  it("should give object with proper aguements if correct save format is given", function() {
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

  it("should give object with proper aguements if only empId is given for query", function() {
    const actualValue = handleInput.parse(["--query", "--empId", "1234"]);
    const expectedValue = {
      command: "--query",
      empId: "1234",
      validation: true
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give object with proper aguements if only bevearage is given for query", function() {
    const actualValue = handleInput.parse(["--query", "--beverage", "Orange"]);
    const expectedValue = {
      command: "--query",
      beverage: "Orange",
      validation: true
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give object with proper aguements if only date is given for query", function() {
    const actualValue = handleInput.parse(["--query", "--date", "2019-02-18"]);
    const expectedValue = {
      command: "--query",
      date: "2019-02-18",
      validation: true
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give object with proper aguements if all three options are given for query", function() {
    const actualValue = handleInput.parse([
      "--query",
      "--beverage",
      "Orange",
      "--date",
      "2019-02-01",
      "--empId",
      "1234"
    ]);
    const expectedValue = {
      command: "--query",
      beverage: "Orange",
      date: "2019-02-01",
      empId: "1234",
      validation: true
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give validation false if empId is not given with -save", function() {
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

  it("should give validation false if beverage is not given with -save", function() {
    const actualValue = handleInput.parse([
      "--save",
      "--empId",
      "1234",
      "--qty",
      "4"
    ]);
    const expectedValue = {
      validation: false
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give validation false if qty is not given with -save", function() {
    const actualValue = handleInput.parse([
      "--save",
      "--empId",
      "1234",
      "--beverage",
      "Orange"
    ]);
    const expectedValue = {
      validation: false
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give validation false if enough options are not given with -query", function() {
    const actualValue = handleInput.parse(["--query", "--qty", "3"]);
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
