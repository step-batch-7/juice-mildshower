const utils = require("../src/utils");
const assert = require("assert");
const fs = require("fs");

describe("getRecords()", function() {
  it("should give existance if no file exists of the given path", function() {
    const actualValue = utils.getRecords("./NoFile");
    const expectedValue = { existance: false };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give content of the file with true flag if file exists", function() {
    const actualValue = utils.getRecords("./test/fileToTestGetRecords.txt");
    const expectedValue = { existance: true, content: { str: "I love happy path" } };
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
    const date = new Date();
    const dateStr = JSON.stringify(date).slice(1, -1);
    const actualValue = utils.getSaveMsg({ beverage: "Orange", qty: 2, date: date }, "1111");
    const expectedValue =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n1111,Orange,2," + dateStr;
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
