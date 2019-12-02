const assert = require("chai").assert;
const transaction = require("../src/transaction");

describe("#insertNewRecord()", function() {
  it("should make entry for new transaction to the empty records and give records back", function() {
    const date = new Date();
    const dateFunc = function() {
      return date;
    };
    const actualValue = transaction.insertNewRecord(
      [],
      { beverage: "Orange", qty: 2, empId: 1111 },
      dateFunc
    );
    const expectedValue = {
      transactionLogs: [{ empId: 1111, beverage: "Orange", qty: 2, date }],
      savedLog: { beverage: "Orange", qty: 2, empId: 1111, date }
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should make entry for new transaction to non empty logs and give records back", function() {
    const date = new Date();
    const dateFunc = function() {
      return date;
    };
    const actualValue = transaction.insertNewRecord(
      [{ empId: 1111, beverage: "Orange", qty: 2, date }],
      { beverage: "Banana", qty: 1, empId: 1234 },
      dateFunc
    );
    const expectedValue = {
      transactionLogs: [
        { empId: 1111, beverage: "Orange", qty: 2, date },
        { beverage: "Banana", qty: 1, empId: 1234, date }
      ],
      savedLog: { beverage: "Banana", qty: 1, empId: 1234, date }
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("#getMatchedRecords()", function() {
  it("should give matched records if only empId is given", function() {
    const actualValue = transaction.getMatchedRecords(
      [
        {
          beverage: "Orng",
          empId: 111,
          qty: 2,
          date: new Date("2019-11-23T20:19:53.166Z")
        },
        {
          beverage: "banana",
          empId: 111,
          qty: 4,
          date: new Date("2019-11-23T20:19:53.166Z")
        },
        {
          beverage: "banana",
          empId: 13,
          qty: 4,
          date: new Date("2019-11-23T20:19:53.166Z")
        }
      ],
      { empId: 111 }
    );
    const expectedValue = [
      {
        beverage: "Orng",
        empId: 111,
        qty: 2,
        date: new Date("2019-11-23T20:19:53.166Z")
      },
      {
        beverage: "banana",
        empId: 111,
        qty: 4,
        date: new Date("2019-11-23T20:19:53.166Z")
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give matched records if only beverage is given", function() {
    const actualValue = transaction.getMatchedRecords(
      [
        {
          beverage: "Orng",
          empId: 111,
          qty: 2,
          date: new Date("2019-11-23T20:19:53.166Z")
        },
        {
          beverage: "banana",
          empId: 111,
          qty: 4,
          date: new Date("2019-11-20T20:19:53.166Z")
        },
        {
          beverage: "banana",
          empId: 13,
          qty: 4,
          date: new Date("2019-11-23T20:19:53.166Z")
        }
      ],
      { beverage: "banana" }
    );
    const expectedValue = [
      {
        beverage: "banana",
        empId: 111,
        qty: 4,
        date: new Date("2019-11-20T20:19:53.166Z")
      },
      {
        beverage: "banana",
        empId: 13,
        qty: 4,
        date: new Date("2019-11-23T20:19:53.166Z")
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give matched records if only date is given", function() {
    const actualValue = transaction.getMatchedRecords(
      [
        {
          beverage: "banana",
          empId: 111,
          qty: 4,
          date: new Date("2019-11-20T20:19:53.166Z")
        },
        {
          beverage: "Banana",
          empId: 13,
          qty: 4,
          date: new Date("2019-11-23T20:19:53.166Z")
        }
      ],
      { date: "2019-11-23" }
    );
    const expectedValue = [
      {
        beverage: "Banana",
        empId: 13,
        qty: 4,
        date: new Date("2019-11-23T20:19:53.166Z")
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give matched records if date and empId are given", function() {
    const actualValue = transaction.getMatchedRecords(
      [
        {
          beverage: "banana",
          empId: 111,
          qty: 4,
          date: new Date("2019-11-20T20:19:53.166Z")
        },
        {
          beverage: "Banana",
          empId: 111,
          qty: 4,
          date: new Date("2019-11-23T20:19:53.166Z")
        },
        {
          beverage: "Banana",
          empId: 13,
          qty: 4,
          date: new Date("2019-11-23T20:19:53.166Z")
        }
      ],
      { date: "2019-11-23", empId: 111 }
    );
    const expectedValue = [
      {
        beverage: "Banana",
        empId: 111,
        qty: 4,
        date: new Date("2019-11-23T20:19:53.166Z")
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give matched records if beverage and empId are given", function() {
    const actualValue = transaction.getMatchedRecords(
      [
        {
          beverage: "Orange",
          empId: 111,
          qty: 4,
          date: new Date("2019-11-20T20:19:53.166Z")
        },
        {
          beverage: "Banana",
          empId: 111,
          qty: 4,
          date: new Date("2019-11-23T20:19:53.166Z")
        },
        {
          beverage: "Banana",
          empId: 13,
          qty: 4,
          date: new Date("2019-11-23T20:19:53.166Z")
        }
      ],
      { beverage: "Banana", empId: 111 }
    );
    const expectedValue = [
      {
        beverage: "Banana",
        empId: 111,
        qty: 4,
        date: new Date("2019-11-23T20:19:53.166Z")
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give matched records if beverage and date are given", function() {
    const actualValue = transaction.getMatchedRecords(
      [
        {
          beverage: "Banana",
          empId: 111,
          qty: 4,
          date: new Date("2019-11-20T20:19:53.166Z")
        },
        {
          beverage: "Banana",
          empId: 111,
          qty: 4,
          date: new Date("2019-11-23T20:19:53.166Z")
        },
        {
          beverage: "Orange",
          empId: 13,
          qty: 4,
          date: new Date("2019-11-23T20:19:53.166Z")
        }
      ],
      { beverage: "Banana", date: "2019-11-23" }
    );
    const expectedValue = [
      {
        beverage: "Banana",
        empId: 111,
        qty: 4,
        date: new Date("2019-11-23T20:19:53.166Z")
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give matched records if empId, beverage and date are given", function() {
    const actualValue = transaction.getMatchedRecords(
      [
        {
          beverage: "Orng",
          empId: 111,
          qty: 2,
          date: new Date("2019-11-23T20:19:53.166Z")
        },
        {
          beverage: "banana",
          empId: 111,
          qty: 4,
          date: new Date("2019-11-23T20:19:53.166Z")
        },
        {
          beverage: "banana",
          empId: 13,
          qty: 4,
          date: new Date("2019-11-20T20:19:53.166Z")
        }
      ],
      { empId: 111, date: "2019-11-23", beverage: "Orng" }
    );
    const expectedValue = [
      {
        beverage: "Orng",
        empId: 111,
        qty: 2,
        date: new Date("2019-11-23T20:19:53.166Z")
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give empty array if no record present for the query", function() {
    const actualValue = transaction.getMatchedRecords(
      [
        {
          beverage: "banana",
          empId: 111,
          qty: 4,
          date: new Date("2019-11-23T20:19:53.166Z")
        }
      ],
      { empId: 11, date: "2012-12-04" }
    );
    const expectedValue = [];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("#empQuery()", function() {
  it("should give all records for given employ Id", function() {
    const actualValue = transaction.empQuery(
      [
        {
          beverage: "Orng",
          empId: 111,
          qty: 2,
          date: new Date("2019-11-23T20:19:53.166Z")
        },
        {
          beverage: "banana",
          empId: 111,
          qty: 4,
          date: new Date("2019-11-23T20:19:53.166Z")
        },
        {
          beverage: "banana",
          empId: 13,
          qty: 4,
          date: new Date("2019-11-23T20:19:53.166Z")
        }
      ],
      111
    );
    const expectedValue = [
      {
        beverage: "Orng",
        empId: 111,
        qty: 2,
        date: new Date("2019-11-23T20:19:53.166Z")
      },
      {
        beverage: "banana",
        empId: 111,
        qty: 4,
        date: new Date("2019-11-23T20:19:53.166Z")
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give empty array if no record for the id is present", function() {
    const actualValue = transaction.empQuery(
      [
        {
          beverage: "banana",
          empId: 111,
          qty: 4,
          date: new Date("2019-11-23T20:19:53.166Z")
        }
      ],
      11
    );
    const expectedValue = [];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("#dateQuery()", function() {
  it("should give records of the given date", function() {
    const actualValue = transaction.dateQuery(
      [
        {
          beverage: "Orng",
          empId: 111,
          qty: 2,
          date: new Date("2019-11-24T20:19:53.166Z")
        },
        {
          beverage: "banana",
          empId: 111,
          qty: 4,
          date: new Date("2019-11-23T20:19:53.166Z")
        }
      ],
      "2019-11-23"
    );
    const expectedValue = [
      {
        beverage: "banana",
        empId: 111,
        qty: 4,
        date: new Date("2019-11-23T20:19:53.166Z")
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give empty array if no record is present of that date ", function() {
    const actualValue = transaction.dateQuery(
      [
        {
          beverage: "Orng",
          empId: 111,
          qty: 2,
          date: new Date("2019-11-24T20:19:53.166Z")
        }
      ],
      "2019-11-23"
    );
    const expectedValue = [];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("#bvrgQuery()", function() {
  it("should give records of the given beverage", function() {
    const actualValue = transaction.bvrgQuery(
      [
        {
          beverage: "Orng",
          empId: 111,
          qty: 2,
          date: new Date("2019-11-24T20:19:53.166Z")
        },
        {
          beverage: "banana",
          empId: 111,
          qty: 4,
          date: new Date("2019-11-23T20:19:53.166Z")
        }
      ],
      "banana"
    );
    const expectedValue = [
      {
        beverage: "banana",
        empId: 111,
        qty: 4,
        date: new Date("2019-11-23T20:19:53.166Z")
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give empty array if no record is present for given beverage ", function() {
    const actualValue = transaction.bvrgQuery(
      [
        {
          beverage: "Orng",
          empId: 111,
          qty: 2,
          date: new Date("2019-11-24T20:19:53.166Z")
        }
      ],
      "banana"
    );
    const expectedValue = [];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("#performAction()", function() {
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
          '[{"beverage":"Or","empId":2,"qty":4,"date":"2019-11-26T06:30:26.943Z"}]'
        );
        assert.strictEqual(encode, "utf8");
        callTimes++;
      },
      dateFunc: () => new Date("2019-11-26T06:30:26.943Z")
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
        return '[{"beverage":"Or","empId":2,"qty":4,"date":"2019-11-26T06:30:26.943Z"}]';
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

  it("should give wrong input message if wrong set of inputs is given", function() {
    const userArgs = ["--query", "--qty", "2"];
    const helperFuncs = {
      reader: (path, encode) => {
        assert.strictEqual(path, "path");
        assert.strictEqual(encode, "utf8");
        return "[]";
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
    const expectedValue = "Please give a valid set of input.";
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("#performSave()", function() {
  it("should save a transaction and write it and give back the save message", function() {
    let callTimes = 0;
    const userArgs = {
      command: "save",
      beverage: "Or",
      qty: 4,
      empId: 2
    };
    const helperFuncs = {
      writer: (path, content, encode) => {
        assert.strictEqual(path, "path");
        assert.strictEqual(
          content,
          '[{"beverage":"Or","empId":2,"qty":4,"date":"2019-11-26T06:30:26.943Z"}]'
        );
        assert.strictEqual(encode, "utf8");
        callTimes++;
      },
      dateFunc: () => new Date("2019-11-26T06:30:26.943Z")
    };

    const actualValue = transaction.performSave(
      userArgs,
      [],
      helperFuncs,
      "path"
    );
    const expectedValue =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n2,Or,4,2019-11-26T06:30:26.943Z";
    assert.deepStrictEqual(actualValue, expectedValue);
    assert.strictEqual(callTimes, 1);
  });
});

describe("#performQuery()", function() {
  it("should give matched results from all records", function() {
    const userArgs = { command: "query", empId: 2 };
    const records = [
      {
        beverage: "Or",
        empId: 2,
        qty: 4,
        date: new Date("2019-11-26T06:30:26.943Z")
      }
    ];

    const actualValue = transaction.performQuery(userArgs, records);
    const expectedValue =
      "Employee ID,Beverage,Quantity,Date\n2,Or,4,2019-11-26T06:30:26.943Z\nTotal: 4 Juices";
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give empty list if no record is present for given query", function() {
    const userArgs = { command: "query", empId: 22 };
    const records = [
      {
        beverage: "Or",
        empId: 2,
        qty: 4,
        date: new Date("2019-11-26T06:30:26.943Z")
      }
    ];

    const actualValue = transaction.performQuery(userArgs, records);
    const expectedValue = "Employee ID,Beverage,Quantity,Date\nTotal: 0 Juice";
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
