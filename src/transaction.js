const utils = require("./utils.js");
const handleInsput = require("./handleInput.js");

const saveLog = function(transactionLogs, transactionDetail, dateFunc) {
  const { empId, beverage, qty } = transactionDetail;
  const date = dateFunc();
  const record = { beverage, qty, date };
  transactionLogs[empId] = transactionLogs[empId] || { empId, orders: [] };
  transactionLogs[empId].orders.push(record);
  return { transactionLogs, savedLog: { empId, beverage, qty, date } };
};

const performQuery = function(transactionLogs, empId) {
  let employeeTransactions = transactionLogs[empId] || { empId, orders: [] };
  return employeeTransactions;
};

const performAction = function(path, helperFuncs, userArgs) {
  const { reader, writer, doesExist, dateFunc } = helperFuncs;
  const transactionLogs = utils.getLogs(path, reader, doesExist);
  const { command, beverage, empId, qty } = handleInsput.parse(userArgs);

  if (command == "--save") {
    const userOptions = { beverage, empId, qty };
    const saveResponse = saveLog(transactionLogs, userOptions, dateFunc);
    utils.updateLogs(path, saveResponse.transactionLogs, writer);
    return utils.getSaveMsg(saveResponse.savedLog);
  }

  const matchedRecords = performQuery(transactionLogs, empId);
  return utils.getQueryMsg(matchedRecords);
};

exports.saveLog = saveLog;
exports.performAction = performAction;
exports.performQuery = performQuery;
