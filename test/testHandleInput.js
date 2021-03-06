const assert = require("chai").assert;
const handleInput = require("../src/handleInput.js");

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
      empId: 25343,
      isValid: true
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give object with proper aguements if only empId is given for query", function() {
    const actualValue = handleInput.parse(["--query", "--empId", "1234"]);
    const expectedValue = {
      command: "--query",
      empId: 1234,
      isValid: true
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give object with proper aguements if only bevearage is given for query", function() {
    const actualValue = handleInput.parse(["--query", "--beverage", "Orange"]);
    const expectedValue = {
      command: "--query",
      beverage: "Orange",
      isValid: true
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give object with proper aguements if only date is given for query", function() {
    const actualValue = handleInput.parse(["--query", "--date", "2019-02-18"]);
    const expectedValue = {
      command: "--query",
      date: "2019-02-18",
      isValid: true
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give object with proper aguements if empId and date are given for query", function() {
    const actualValue = handleInput.parse([
      "--query",
      "--empId",
      "12",
      "--date",
      "2019-02-18"
    ]);
    const expectedValue = {
      command: "--query",
      date: "2019-02-18",
      empId: 12,
      isValid: true
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give object with proper aguements if beverage and date are given for query", function() {
    const actualValue = handleInput.parse([
      "--query",
      "--beverage",
      "Orange",
      "--date",
      "2019-02-18"
    ]);
    const expectedValue = {
      command: "--query",
      date: "2019-02-18",
      beverage: "Orange",
      isValid: true
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give object with proper aguements if beverage and empId are given for query", function() {
    const actualValue = handleInput.parse([
      "--query",
      "--beverage",
      "Orange",
      "--empId",
      "12"
    ]);
    const expectedValue = {
      command: "--query",
      empId: 12,
      beverage: "Orange",
      isValid: true
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
      empId: 1234,
      isValid: true
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
      isValid: false
    };
    assert.include(actualValue, expectedValue);
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
      isValid: false
    };
    assert.include(actualValue, expectedValue);
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
      isValid: false
    };
    assert.include(actualValue, expectedValue);
  });

  it("should give validation false if enough options are not given with -query", function() {
    const actualValue = handleInput.parse(["--query", "--qty", "3"]);
    const expectedValue = {
      isValid: false
    };
    assert.include(actualValue, expectedValue);
  });

  it("should give validation false if wrong command is given", function() {
    const actualValue = handleInput.parse(["--abc"]);
    const expectedValue = {
      isValid: false
    };
    assert.include(actualValue, expectedValue);
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
      isValid: false
    };
    assert.include(actualValue, expectedValue);
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
      isValid: false
    };
    assert.include(actualValue, expectedValue);
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
      isValid: false
    };
    assert.include(actualValue, expectedValue);
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
      isValid: false
    };
    assert.include(actualValue, expectedValue);
  });

  it("should give validation false if date format is wrong", function() {
    const actualValue = handleInput.parse(["--query", "--date", "2019,02,12"]);
    const expectedValue = {
      isValid: false
    };
    assert.include(actualValue, expectedValue);
  });

  it("should give validation false if date bound is wrong", function() {
    const actualValue = handleInput.parse(["--query", "--date", "2019-02-29"]);
    const expectedValue = {
      isValid: false
    };
    assert.include(actualValue, expectedValue);
  });
});

describe("#isValidBvrg()", function() {
  it("should give true if given beverage choice is a string of length more than 0", function() {
    const actualValue = handleInput.isValidBvrg("Orange");
    assert.ok(actualValue);
  });

  it("should give false if given beverage choice is a empty string", function() {
    const actualValue = handleInput.isValidBvrg("");
    assert.ok(!actualValue);
  });

  it("should give false if given beverage choice is not a string", function() {
    const actualValue = handleInput.isValidBvrg(5);
    assert.ok(!actualValue);
  });
});

describe("#isValidDate()", function() {
  it("should give true if date format and bound is valid", function() {
    const actualValue = handleInput.isValidDate("2019-11-28");
    assert.ok(actualValue);
  });

  it("should give false if date format is valid but out of bound", function() {
    const actualValue = handleInput.isValidDate("2019-34-28");
    assert.ok(!actualValue);
  });

  it("should give false if date format is invalid", function() {
    const actualValue = handleInput.isValidDate("2019/11/28");
    assert.ok(!actualValue);
  });
});

describe("#isPositiveInt()", function() {
  it("should give true if a positive integer is given", function() {
    const actualValue = handleInput.isPositiveInt("5");
    assert.ok(actualValue);
  });

  it("should give false if 0 is given", function() {
    const actualValue = handleInput.isPositiveInt("0");
    assert.ok(!actualValue);
  });

  it("should give false if negative no is given", function() {
    const actualValue = handleInput.isPositiveInt("-7");
    assert.ok(!actualValue);
  });
});

describe("#isValidCombo", function() {
  it("should validate arg combination if needed options are given with -save", function() {
    const actualValue = handleInput.isValidCombo({
      command: "--save",
      beverage: "Orange",
      qty: "4",
      empId: "1234"
    });
    assert.ok(actualValue);
  });

  it("should validate if needed options are  given with -query", function() {
    const actualValue = handleInput.isValidCombo({
      command: "--query",
      empId: "1234"
    });
    assert.ok(actualValue);
  });

  it("should invalidate arg combination if empId is not given with -save", function() {
    const actualValue = handleInput.isValidCombo({
      command: "--save",
      beverage: "Orange",
      qty: "4"
    });
    assert.notOk(actualValue);
  });

  it("should invalidate arg combination if beverage is not given with -save", function() {
    const actualValue = handleInput.isValidCombo({
      command: "--save",
      empId: "1234",
      qty: "4"
    });
    assert.notOk(actualValue);
  });

  it("should invalidate args combination if qty is not given with -save", function() {
    const actualValue = handleInput.isValidCombo({
      command: "--save",
      empId: "1234",
      beverage: "Orange"
    });

    assert.notOk(actualValue);
  });

  it("should invalidate args combination if enough options are not given with -query", function() {
    const actualValue = handleInput.isValidCombo({
      command: "--query",
      qty: "3"
    });
    assert.notOk(actualValue);
  });
});
