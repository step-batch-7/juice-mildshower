const utils = require("./utils.js");

const makeTransactionEntry = function(transactionRecords, userArgs, dateStamp, path) {
  const empId = userArgs.empId;
  transactionRecords.content[empId] = transactionRecords.content[empId] || [];
  const record = { beverage: userArgs.beverage, qty: userArgs.qty, dateStamp };
  transactionRecords.content[empId].push(record);
  const message = utils.makeSaveMsg(record, empId);
  return { transactionRecords: transactionRecords, message: message };
};

const performTransaction = function(path, userArgs, dateStamp) {
  const transactionActions = { "--save": makeTransactionEntry, "--query": performQuery };
  const transactionRecords = utils.getRecords(path);
  const command = userArgs[0];
  const userOptions = { beverage: userArgs[2], empId: userArgs[4], qty: userArgs[6] };
  return transactionActions[command](transactionRecords, userOptions, dateStamp, path);
};
