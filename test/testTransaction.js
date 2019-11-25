const transaction = require("../src/transaction");
const assert = require("assert");

describe("makeTransactionEntry", function() {
  it("should make entry for new transaction to the empty records and give records back", function() {
    const date = new Date().toJSON();
    const dateFunc = function() {
      return date;
    };
    const actualValue = transaction.makeTransactionEntry(
      {},
      { beverage: "Orange", qty: 2, empId: "1111" },
      dateFunc
    );
    const expectedValue = {
      transactionRecords: {
        "1111": { empId: "1111", orders: [{ beverage: "Orange", qty: 2, date }] }
      },
      cmdSpecificData: { beverage: "Orange", qty: 2, empId: "1111", date }
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
      transactionRecords: {
        "111": {
          empId: "111",
          orders: [
            { beverage: "Orng", qty: 2, date: "2019-11-23T20:19:53.166Z" },
            { beverage: "banana", qty: 4, date: "2019-11-23T20:19:53.166Z" }
          ]
        }
      },
      cmdSpecificData: {
        empId: "111",
        orders: [
          { beverage: "Orng", qty: 2, date: "2019-11-23T20:19:53.166Z" },
          { beverage: "banana", qty: 4, date: "2019-11-23T20:19:53.166Z" }
        ]
      }
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give empty array if no record for the id is present", function() {
    const actualValue = transaction.performQuery({}, { empId: "2531" });
    const expectedValue = {
      cmdSpecificData: { empId: "2531", orders: [] },
      transactionRecords: {}
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
