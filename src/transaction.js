const utils = require("./utils.js");
const handleInsput = require("./handleInput.js");

const saveLog = function(transactionLogs, transactionDetail, dateFunc) {
  transactionDetail.date = dateFunc();
  transactionLogs.push(transactionDetail);
  return { transactionLogs, savedLog: transactionDetail };
};

const empQuery = function(transactionLogs, empId) {
  return transactionLogs.filter(utils.doesEmpIdMatch(empId));
};

const dateQuery = function(transactionLogs, date) {
  return transactionLogs.filter(utils.doesDateMatch(date));
};

const performQuery = function(transactionLogs, userOptions) {
  const { date, empId } = userOptions;
  matchedLogs = transactionLogs.slice();
  matchedLogs = (empId && empQuery(matchedLogs, empId)) || matchedLogs;
  matchedLogs = (date && dateQuery(matchedLogs, date)) || matchedLogs;
  return matchedLogs;
};

const performAction = function(path, helperFuncs, userArgs) {
  const { reader, writer, doesExist, dateFunc } = helperFuncs;
  const transactionLogs = utils.getLogs(path, reader, doesExist);
  const { command, beverage, empId, qty, date } = handleInsput.parse(userArgs);

  if (command == "--save") {
    const userOptions = { beverage, empId, qty };
    const saveResponse = saveLog(transactionLogs, userOptions, dateFunc);
    utils.updateLogs(path, saveResponse.transactionLogs, writer);
    return utils.getSaveMsg(saveResponse.savedLog);
  }

  const userOptions = { empId, date };
  const matchedRecords = performQuery(transactionLogs, userOptions);
  return utils.getQueryMsg(matchedRecords);
};

exports.saveLog = saveLog;
exports.performAction = performAction;
exports.performQuery = performQuery;
exports.empQuery = empQuery;
exports.dateQuery = dateQuery;
