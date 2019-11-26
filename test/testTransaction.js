const transaction = require("../src/transaction");
const assert = require("assert");

describe("saveLog", function() {
  it("should make entry for new transaction to the empty records and give records back", function() {
    const date = new Date().toJSON();
    const dateFunc = function() {
      return date;
    };
    const actualValue = transaction.saveLog(
      {},
      { beverage: "Orange", qty: 2, empId: "1111" },
      dateFunc
    );
    const expectedValue = {
      transactionLogs: {
        "1111": {
          empId: "1111",
          orders: [{ beverage: "Orange", qty: 2, date }]
        }
      },
      savedLog: { beverage: "Orange", qty: 2, empId: "1111", date }
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
      "111"
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
    const actualValue = transaction.performQuery({}, "2531");
    const expectedValue = { empId: "2531", orders: [] };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("performAction", function() {
  it("should save a transaction if save command is given", function() {
    let callTimes = 0;
    const userArgs = [
      "--save",
      "--beverage",
      "Or",
      "--qty",
      "4",
      "--empId",
      "2"
    ];
    const helperFuncs = {
      reader: (path, encode) => {
        assert.strictEqual(path, "path");
        assert.strictEqual(encode, "utf8");
        return "{}";
      },
      doesExist: path => {
        assert.strictEqual(path, "path");
        return true;
      },
      writer: (path, content, encode) => {
        assert.strictEqual(path, "path");

        assert.strictEqual(
          content,
          '{"2":{"empId":"2","orders":[{"beverage":"Or","qty":4,"date":"2019-11-26T06:30:26.943Z"}]}}'
        );
        assert.strictEqual(encode, "utf8");
        callTimes++;
      },
      dateFunc: () => "2019-11-26T06:30:26.943Z"
    };

    const actualValue = transaction.performAction(
      "path",
      helperFuncs,
      userArgs
    );
    const expectedValue =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n2,Or,4,2019-11-26T06:30:26.943Z";
    assert.deepStrictEqual(actualValue, expectedValue);
    assert.strictEqual(callTimes, 1);
  });
  it("should give matched results if query is given", function() {
    const userArgs = ["--query", "--empId", "2"];
    const helperFuncs = {
      reader: (path, encode) => {
        assert.strictEqual(path, "path");
        assert.strictEqual(encode, "utf8");
        return '{"2":{"empId":"2","orders":[{"beverage":"Or","qty":4,"date":"2019-11-26T06:30:26.943Z"}]}}';
      },
      doesExist: path => {
        assert.strictEqual(path, "path");
        return true;
      }
    };

    const actualValue = transaction.performAction(
      "path",
      helperFuncs,
      userArgs
    );
    const expectedValue =
      "Employee ID,Beverage,Quantity,Date\n2,Or,4,2019-11-26T06:30:26.943Z\nTotal: 4 Juices";
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
