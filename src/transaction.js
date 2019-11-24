const utils = require("./utils.js");

const makeTransactionEntry = function(transactionRecords, userArgs, dateFunc) {
  const { empId, beverage, qty } = userArgs;
  const date = dateFunc();
  const record = { beverage, qty: +qty, date: date };
  transactionRecords[empId] = transactionRecords[empId] || [];
  transactionRecords[empId].push(record);
  dateStr = JSON.stringify(date).slice(1, -1);
  return { transactionRecords, cmdSpecificData: { empId, beverage, qty, date: dateStr } };
};

const performQuery = function(transactionRecords, userArgs) {
  const { empId } = userArgs;
  let transactions = transactionRecords[empId] || [];
  transactions = transactions.map(utils.insertEmpId(empId));
  return { transactionRecords, cmdSpecificData: transactions };
};

const performTransaction = function(path, readerFunc, existanceCheker, userArgs, dateFunc) {
  const transactionActions = { "--save": makeTransactionEntry, "--query": performQuery };
  const recordFileContent = utils.getRecords(path, readerFunc, existanceCheker);
  const [command, , beverage, , empId, , qty] = userArgs;
  const userOptions = { beverage, empId, qty };
  const recordsAndCmdReturns = transactionActions[command](
    recordFileContent,
    userOptions,
    dateFunc
  );
  if (command == "--save") {
    utils.updateRecords(path, recordsAndCmdReturns.transactionRecords);
  }
  const messageGenerator = { "--save": utils.getSaveMsg, "--query": utils.getQueryMsg };
  return messageGenerator[command](recordsAndCmdReturns.cmdSpecificData);
};

exports.makeTransactionEntry = makeTransactionEntry;
exports.performTransaction = performTransaction;
exports.performQuery = performQuery;
