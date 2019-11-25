const utils = require("./utils.js");

const makeTransactionEntry = function(transactionRecords, transactionDetail, dateFunc) {
  const { empId, beverage, qty } = transactionDetail;
  const date = dateFunc();
  const record = { beverage, qty, date };
  transactionRecords[empId] = transactionRecords[empId] || { empId, orders: [] };
  transactionRecords[empId].orders.push(record);
  return { transactionRecords, cmdSpecificData: { empId, beverage, qty, date } };
};

const performQuery = function(transactionRecords, userArgs) {
  const { empId } = userArgs;
  let employeeTransactions = transactionRecords[empId] || { empId, orders: [] };
  return { transactionRecords, cmdSpecificData: employeeTransactions };
};

const performTransaction = function(path, readerFunc, existanceCheker, userArgs, dateFunc) {
  const transactionActions = { "--save": makeTransactionEntry, "--query": performQuery };
  const transactionRecords = utils.getRecords(path, readerFunc, existanceCheker);
  let [command, , beverage, , empId, , qty] = userArgs;
  qty = +qty;
  const userOptions = { beverage, empId, qty };
  const actionResponse = transactionActions[command](transactionRecords, userOptions, dateFunc);
  if (command == "--save") {
    utils.updateRecords(path, actionResponse.transactionRecords);
  }
  const messageGenerators = { "--save": utils.getSaveMsg, "--query": utils.getQueryMsg };
  return messageGenerators[command](actionResponse.cmdSpecificData);
};

exports.makeTransactionEntry = makeTransactionEntry;
exports.performTransaction = performTransaction;
exports.performQuery = performQuery;
