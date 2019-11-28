const utils = require("../src/utils");
const assert = require("assert");

describe("#getLogs()", function() {
  it("should give empty obj if no file exists of the given path", function() {
    const actualValue = utils.getLogs(
      "./NoFile",
      function(arg1, arg2) {
        assert.strictEqual(arg1, "./NoFile");
        assert.strictEqual(arg2, "utf8");
        return '[{"key":"value"}]';
      },
      function(arg) {
        assert.strictEqual(arg, "./NoFile");
        return false;
      }
    );
    const expectedValue = [];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give content of the file with true flag if file exists", function() {
    const actualValue = utils.getLogs(
      "path",
      function(path, encode) {
        assert.strictEqual(path, "path");
        assert.strictEqual(encode, "utf8");
        return '[{"key": "value"}]';
      },
      function() {
        return true;
      }
    );
    const expectedValue = [{ key: "value" }];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("updateRecords()", function() {
  it("should make JSON string version of the content and give it to write func", function() {
    let callTimes = 0;
    utils.updateLogs("path", [{ msg: "Hi" }], function(path, content, encode) {
      assert.strictEqual(path, "path");
      assert.deepStrictEqual(content, '[{"msg":"Hi"}]');
      assert.strictEqual(encode, "utf8");
      callTimes++;
    });
    assert.strictEqual(callTimes, 1);
  });
});

describe("#getSaveMsg()", function() {
  it("should give message saying details is recorded", function() {
    const date = "2019-11-24T08:40:49.347Z";
    const actualValue = utils.getSaveMsg({
      empId: "1111",
      beverage: "Orange",
      qty: 2,
      date
    });
    const expectedValue =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n1111,Orange,2," +
      date;
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("#getQueryMsg()", function() {
  it("should give all given records in a string format with total quantity count", function() {
    const actualValue = utils.getQueryMsg([
      {
        beverage: "Orng",
        qty: 2,
        empId: "111",
        date: "2019-11-23T20:19:53.166Z"
      },
      {
        beverage: "banana",
        qty: 4,
        empId: "111",
        date: "2019-11-23T20:19:53.166Z"
      }
    ]);
    const expectedValue =
      "Employee ID,Beverage,Quantity,Date\n111,Orng,2,2019-11-23T20:19:53.166Z\n111,banana,4,2019-11-23T20:19:53.166Z\nTotal: 6 Juices";
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give no data if no record is provided", function() {
    const actualValue = utils.getQueryMsg([]);
    const expectedValue = "Employee ID,Beverage,Quantity,Date\nTotal: 0 Juices";
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("#addRecordDetails()", function() {
  it("should add details of the given recors to the given str", function() {
    const actualValue = utils.addRecordDetails("hi: ", {
      beverage: "b",
      qty: 1,
      date: "d",
      empId: "1111"
    });
    const expectedValue = "hi: \n1111,b,1,d";
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("#countQuantities()", function() {
  it("should add the quantity to given number", function() {
    const actualValue = utils.countQuantities(5, { qty: 3 });
    const expectedValue = 8;
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("#doesDateMatch()", function() {
  it("should give a func that should give true if date of given record matches with the given date", function() {
    const actualValue = utils.doesDateMatch("2019-11-23")({
      date: "2019-11-23T20:19:53.166Z"
    });
    const expectedValue = true;
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give a func that should give false if date of given record does not match with the given date", function() {
    const actualValue = utils.doesDateMatch("2019-11-23")({
      date: "2019-11-20T20:19:53.166Z"
    });
    const expectedValue = false;
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("#doesKeyValMatch()", function() {
  it("should give a func that should give true if empId of given record matches with the given empId", function() {
    const actualValue = utils.doesKeyValMatch("empId", "888")({ empId: "888" });
    const expectedValue = true;
    assert.strictEqual(actualValue, expectedValue);
  });

  it("should give a func that should give false if empId of given record does not match with the given empId", function() {
    const actualValue = utils.doesKeyValMatch("empId", "888")({ empId: "123" });
    const expectedValue = false;
    assert.strictEqual(actualValue, expectedValue);
  });
});
