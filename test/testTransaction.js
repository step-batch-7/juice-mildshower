const transaction = require("../src/transaction");
const assert = require("assert");

describe("makeTransactionEntry", function() {
  it("should make entry for new transaction to the empty records and give records back", function() {
    const date = new Date();
    const dateStr = JSON.stringify(date).slice(1, -1);
    const dateFunc = function() {
      return date;
    };
    const actualValue = transaction.makeTransactionEntry(
      {},
      { beverage: "Orange", qty: 2, empId: "1111" },
      dateFunc
    );
    const expectedValue = {
      transactionRecords: { "1111": [{ beverage: "Orange", qty: 2, date }] },
      cmdSpecificData: { beverage: "Orange", qty: 2, empId: "1111", date: dateStr }
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("performQuery", function() {
  it("should give all records for given employ Id", function() {
    const actualValue = transaction.performQuery(
      {
        "111": [
          { beverage: "Orng", qty: 2, date: "2019-11-23T20:19:53.166Z" },
          { beverage: "banana", qty: 4, date: "2019-11-23T20:19:53.166Z" }
        ]
      },
      { empId: "111" }
    );
    const expectedValue = {
      transactionRecords: {
        "111": [
          { beverage: "Orng", qty: 2, date: "2019-11-23T20:19:53.166Z" },
          { beverage: "banana", qty: 4, date: "2019-11-23T20:19:53.166Z" }
        ]
      },
      cmdSpecificData: [
        { beverage: "Orng", qty: 2, date: "2019-11-23T20:19:53.166Z", empId: "111" },
        { beverage: "banana", qty: 4, date: "2019-11-23T20:19:53.166Z", empId: "111" }
      ]
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give empty array if no record for the id is present", function() {
    const actualValue = transaction.performQuery({}, { empId: "2531" });
    const expectedValue = { cmdSpecificData: [], transactionRecords: {} };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
