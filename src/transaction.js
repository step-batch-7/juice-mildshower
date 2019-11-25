const utils = require("./utils.js");
const handleInsput = require("./handleInput.js");

const saveTransaction = function(transactionRecords, transactionDetail, dateFunc) {
  const { empId, beverage, qty } = transactionDetail;
  const date = dateFunc();
  const record = { beverage, qty, date };
  transactionRecords[empId] = transactionRecords[empId] || { empId, orders: [] };
  transactionRecords[empId].orders.push(record);
  return { transactionRecords, insertedRecord: { empId, beverage, qty, date } };
};

const performQuery = function(transactionRecords, userArgs) {
  const { empId } = userArgs;
  let employeeTransactions = transactionRecords[empId] || { empId, orders: [] };
  return employeeTransactions;
};

const performTransaction = function(
  path,
  readerFunc,
  existanceCheker,
  writeFunc,
  userArgs,
  dateFunc
) {
  const transactionRecords = utils.getRecords(path, readerFunc, existanceCheker);
  const { command, beverage, empId, qty } = handleInsput.parse(userArgs);
  const userOptions = { beverage, empId, qty };
  if (command == "--save") {
    const saveResponse = saveTransaction(transactionRecords, userOptions, dateFunc);
    utils.updateRecords(path, saveResponse.transactionRecords, writeFunc);
    return utils.getSaveMsg(saveResponse.insertedRecord);
  }
  const matchedRecords = performQuery(transactionRecords, userOptions);
  return utils.getQueryMsg(matchedRecords);
};

exports.saveTransaction = saveTransaction;
exports.performTransaction = performTransaction;
exports.performQuery = performQuery;
