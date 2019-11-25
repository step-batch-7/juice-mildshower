const utils = require("../src/utils");
const assert = require("assert");
const fs = require("fs");

describe("getRecords()", function() {
  it("should give empty obj if no file exists of the given path", function() {
    const actualValue = utils.getRecords(
      "./NoFile",
      function() {
        return '{"key":"Value"}';
      },
      function() {
        return false;
      }
    );
    const expectedValue = {};
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give content of the file with true flag if file exists", function() {
    const actualValue = utils.getRecords(
      "path",
      function() {
        return '{"key": "value"}';
      },
      function() {
        return true;
      }
    );
    const expectedValue = { key: "value" };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("updateRecords()", function() {
  it("should update the given valid json file with the given object", function() {
    const path = "./test/fileToTestUpdateRecords.json";
    fs.writeFileSync(path, { msg: "Hello" }, "utf8");
    utils.updateRecords(path, { msg: "Hi" });
    const actualValue = fs.readFileSync(path, "utf8");
    const expectedValue = '{"msg":"Hi"}';
    assert.deepStrictEqual(actualValue, expectedValue);
    fs.unlinkSync(path);
  });
});

describe("getSaveMsg()", function() {
  it("should give message saying details is recorded", function() {
    const date = "2019-11-24T08:40:49.347Z";
    const actualValue = utils.getSaveMsg({ empId: "1111", beverage: "Orange", qty: 2, date: date });
    const expectedValue =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n1111,Orange,2," + date;
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("getQueryMsg", function() {
  it("should give all given records in a string format with total quantity count", function() {
    const actualValue = utils.getQueryMsg({
      empId: "111",
      orders: [
        { beverage: "Orng", qty: 2, date: "2019-11-23T20:19:53.166Z" },
        { beverage: "banana", qty: 4, date: "2019-11-23T20:19:53.166Z" }
      ]
    });
    const expectedValue =
      "Employee ID,Beverage,Quantity,Date\n111,Orng,2,2019-11-23T20:19:53.166Z\n111,banana,4,2019-11-23T20:19:53.166Z\nTotal: 6 Juices";
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give no data message if no record is provided", function() {
    const actualValue = utils.getQueryMsg({ empId: "000", orders: [] });
    const expectedValue = "No record for the employee";
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("insertEmpId", function() {
  it("should give a function that inserts the given empId to a record", function() {
    const actualValue = utils.insertEmpId("1111")({ beverage: "b", qty: 1, date: "d" });
    const expectedValue = { beverage: "b", qty: 1, date: "d", empId: "1111" };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("addRecordDetails", function() {
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

describe("countQuantities", function() {
  it("should add the quantity to given number", function() {
    const actualValue = utils.countQuantities(5, { qty: 3 });
    const expectedValue = 8;
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
