const transaction = require("../src/transaction");
const assert = require("assert");

describe("saveLog", function() {
  it("should make entry for new transaction to the empty records and give records back", function() {
    const date = new Date().toJSON();
    const dateFunc = function() {
      return date;
    };
    const actualValue = transaction.saveLog(
      [],
      { beverage: "Orange", qty: 2, empId: "1111" },
      dateFunc
    );
    const expectedValue = {
      transactionLogs: [{ empId: "1111", beverage: "Orange", qty: 2, date }],
      savedLog: { beverage: "Orange", qty: 2, empId: "1111", date }
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("performQuery", function() {
  it("should give matched records if only empId is given", function() {
    const actualValue = transaction.performQuery(
      [
        {
          beverage: "Orng",
          empId: "111",
          qty: 2,
          date: "2019-11-23T20:19:53.166Z"
        },
        {
          beverage: "banana",
          empId: "111",
          qty: 4,
          date: "2019-11-23T20:19:53.166Z"
        },
        {
          beverage: "banana",
          empId: "13",
          qty: 4,
          date: "2019-11-23T20:19:53.166Z"
        }
      ],
      { empId: "111" }
    );
    const expectedValue = [
      {
        beverage: "Orng",
        empId: "111",
        qty: 2,
        date: "2019-11-23T20:19:53.166Z"
      },
      {
        beverage: "banana",
        empId: "111",
        qty: 4,
        date: "2019-11-23T20:19:53.166Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give matched records if only empId is given", function() {
    const actualValue = transaction.performQuery(
      [
        {
          beverage: "Orng",
          empId: "111",
          qty: 2,
          date: "2019-11-23T20:19:53.166Z"
        },
        {
          beverage: "banana",
          empId: "111",
          qty: 4,
          date: "2019-11-20T20:19:53.166Z"
        },
        {
          beverage: "banana",
          empId: "13",
          qty: 4,
          date: "2019-11-23T20:19:53.166Z"
        }
      ],
      { empId: "111", date: "2019-11-23" }
    );
    const expectedValue = [
      {
        beverage: "Orng",
        empId: "111",
        qty: 2,
        date: "2019-11-23T20:19:53.166Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give matched records if only date is given", function() {
    const actualValue = transaction.performQuery(
      [
        {
          beverage: "banana",
          empId: "111",
          qty: 4,
          date: "2019-11-20T20:19:53.166Z"
        },
        {
          beverage: "Banana",
          empId: "13",
          qty: 4,
          date: "2019-11-23T20:19:53.166Z"
        }
      ],
      { date: "2019-11-23" }
    );
    const expectedValue = [
      {
        beverage: "Banana",
        empId: "13",
        qty: 4,
        date: "2019-11-23T20:19:53.166Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give empty array if no record for the query is present", function() {
    const actualValue = transaction.performQuery(
      [
        {
          beverage: "banana",
          empId: "111",
          qty: 4,
          date: "2019-11-23T20:19:53.166Z"
        }
      ],
      { empId: "11", date: "2012-12-04" }
    );
    const expectedValue = [];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("empQuery", function() {
  it("should give all records for given employ Id", function() {
    const actualValue = transaction.empQuery(
      [
        {
          beverage: "Orng",
          empId: "111",
          qty: 2,
          date: "2019-11-23T20:19:53.166Z"
        },
        {
          beverage: "banana",
          empId: "111",
          qty: 4,
          date: "2019-11-23T20:19:53.166Z"
        },
        {
          beverage: "banana",
          empId: "13",
          qty: 4,
          date: "2019-11-23T20:19:53.166Z"
        }
      ],
      "111"
    );
    const expectedValue = [
      {
        beverage: "Orng",
        empId: "111",
        qty: 2,
        date: "2019-11-23T20:19:53.166Z"
      },
      {
        beverage: "banana",
        empId: "111",
        qty: 4,
        date: "2019-11-23T20:19:53.166Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give empty array if no record for the id is present", function() {
    const actualValue = transaction.empQuery(
      [
        {
          beverage: "banana",
          empId: "111",
          qty: 4,
          date: "2019-11-23T20:19:53.166Z"
        }
      ],
      "11"
    );
    const expectedValue = [];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("dateQuery", function() {
  it("should give records of the given date", function() {
    const actualValue = transaction.dateQuery(
      [
        {
          beverage: "Orng",
          empId: "111",
          qty: 2,
          date: "2019-11-24T20:19:53.166Z"
        },
        {
          beverage: "banana",
          empId: "111",
          qty: 4,
          date: "2019-11-23T20:19:53.166Z"
        }
      ],
      "2019-11-23"
    );
    const expectedValue = [
      {
        beverage: "banana",
        empId: "111",
        qty: 4,
        date: "2019-11-23T20:19:53.166Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give empty array if no record is present of that date ", function() {
    const actualValue = transaction.dateQuery(
      [
        {
          beverage: "Orng",
          empId: "111",
          qty: 2,
          date: "2019-11-24T20:19:53.166Z"
        }
      ],
      "2019-11-23"
    );
    const expectedValue = [];
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
        return "[]";
      },
      doesExist: path => {
        assert.strictEqual(path, "path");
        return true;
      },
      writer: (path, content, encode) => {
        assert.strictEqual(path, "path");

        assert.strictEqual(
          content,
          '[{"beverage":"Or","empId":"2","qty":4,"date":"2019-11-26T06:30:26.943Z"}]'
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
        return '[{"beverage":"Or","empId":"2","qty":4,"date":"2019-11-26T06:30:26.943Z"}]';
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
