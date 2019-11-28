const utils = require("./utils.js");
const handleInsput = require("./handleInput.js");

const saveLog = function(transactionLogs, transactionDetail, dateFunc) {
  transactionDetail.date = dateFunc();
  transactionLogs.push(transactionDetail);
  return { transactionLogs, savedLog: transactionDetail };
};

const empQuery = function(transactionLogs, empId) {
  return transactionLogs.filter(utils.doesKeyValMatch("empId", empId));
};

const dateQuery = function(transactionLogs, date) {
  return transactionLogs.filter(utils.doesDateMatch(date));
};

const bvrgQuery = function(transactionLogs, bvrg) {
  return transactionLogs.filter(utils.doesKeyValMatch("beverage", bvrg));
};

const performQuery = function(transactionLogs, userOptions) {
  const { date, empId, beverage } = userOptions;
  matchedLogs = transactionLogs.slice();
  matchedLogs = (empId && empQuery(matchedLogs, empId)) || matchedLogs;
  matchedLogs = (date && dateQuery(matchedLogs, date)) || matchedLogs;
  matchedLogs = (beverage && bvrgQuery(matchedLogs, beverage)) || matchedLogs;
  return matchedLogs;
};

const performAction = function(path, helperFuncs, userArgs) {
  const { reader, writer, doesExist, dateFunc } = helperFuncs;
  const transactionLogs = utils.getLogs(path, reader, doesExist);
  const parsedArgs = handleInsput.parse(userArgs);

  if (!parsedArgs.validation) {
    return "Please give a valid set of input.";
  }

  const { command, beverage, empId, qty, date } = parsedArgs;

  if (command == "--save") {
    const userOptions = { beverage, empId, qty };
    const saveResponse = saveLog(transactionLogs, userOptions, dateFunc);
    utils.updateLogs(path, saveResponse.transactionLogs, writer);
    return utils.getSaveMsg(saveResponse.savedLog);
  }

  const userOptions = { empId, date, beverage };
  const matchedRecords = performQuery(transactionLogs, userOptions);
  return utils.getQueryMsg(matchedRecords);
};

exports.saveLog = saveLog;
exports.performAction = performAction;
exports.performQuery = performQuery;
exports.empQuery = empQuery;
exports.dateQuery = dateQuery;
exports.bvrgQuery = bvrgQuery;
