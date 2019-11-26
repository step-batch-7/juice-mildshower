const utils = require("./utils.js");
const handleInsput = require("./handleInput.js");

const saveLog = function(transactionLogs, transactionDetail, dateFunc) {
  transactionDetail.date = dateFunc();
  transactionLogs.push(transactionDetail);
  return { transactionLogs, savedLog: transactionDetail };
};

const performQuery = function(transactionLogs, empId) {
  return transactionLogs.filter(utils.doesEmpIdMatch(empId));
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
