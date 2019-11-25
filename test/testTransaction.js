const transaction = require("../src/transaction");
const assert = require("assert");

describe("saveTransaction", function() {
  it("should make entry for new transaction to the empty records and give records back", function() {
    const date = new Date().toJSON();
    const dateFunc = function() {
      return date;
    };
    const actualValue = transaction.saveTransaction(
      {},
      { beverage: "Orange", qty: 2, empId: "1111" },
      dateFunc
    );
    const expectedValue = {
      transactionRecords: {
        "1111": { empId: "1111", orders: [{ beverage: "Orange", qty: 2, date }] }
      },
      insertedRecord: { beverage: "Orange", qty: 2, empId: "1111", date }
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("performQuery", function() {
  it("should give all records for given employ Id", function() {
    const actualValue = transaction.performQuery(
      {
        "111": {
          empId: "111",
          orders: [
            { beverage: "Orng", qty: 2, date: "2019-11-23T20:19:53.166Z" },
            { beverage: "banana", qty: 4, date: "2019-11-23T20:19:53.166Z" }
          ]
        }
      },
      { empId: "111" }
    );
    const expectedValue = {
      empId: "111",
      orders: [
        { beverage: "Orng", qty: 2, date: "2019-11-23T20:19:53.166Z" },
        { beverage: "banana", qty: 4, date: "2019-11-23T20:19:53.166Z" }
      ]
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give empty array if no record for the id is present", function() {
    const actualValue = transaction.performQuery({}, { empId: "2531" });
    const expectedValue = { empId: "2531", orders: [] };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
