const utils = require("./utils.js");
const handleInsput = require("./handleInput.js");

const insertNewRecord = function(transactionLogs, recordDetails, dateFunc) {
  const { beverage, empId, qty } = recordDetails;
  const newRecord = { beverage, empId, qty, date: dateFunc() };
  transactionLogs.push(newRecord);
  return { transactionLogs, savedLog: newRecord };
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

const getMatchedRecords = function(transactionLogs, queryKeys) {
  const { date, empId, beverage } = queryKeys;
  matchedLogs = (empId && empQuery(transactionLogs, empId)) || transactionLogs;
  matchedLogs = (date && dateQuery(matchedLogs, date)) || matchedLogs;
  return (beverage && bvrgQuery(matchedLogs, beverage)) || matchedLogs;
};

const performSave = function(parsedArgs, transactionLogs, helperFuncs, path) {
  const { writer, dateFunc } = helperFuncs;
  const saveResponse = insertNewRecord(transactionLogs, parsedArgs, dateFunc);
  utils.writeTransRecords(path, saveResponse.transactionLogs, writer);
  return utils.getSaveMsg(saveResponse.savedLog);
};

const performQuery = function(parsedArgs, transactionLogs) {
  const matchedRecords = getMatchedRecords(transactionLogs, parsedArgs);
  return utils.getQueryMsg(matchedRecords);
};

const performAction = function(path, helperFuncs, userArgs) {
  const parsedArgs = handleInsput.parse(userArgs);

  if (!parsedArgs.isValid) {
    return "Please give a valid set of input.";
  }

  const { reader, doesExist } = helperFuncs;
  const transactionLogs = utils.loadTransRecords(path, reader, doesExist);
  const cmdActions = { "--save": performSave, "--query": performQuery };
  const commandAction = cmdActions[parsedArgs.command];
  return commandAction(parsedArgs, transactionLogs, helperFuncs, path);
};

exports.insertNewRecord = insertNewRecord;
exports.performAction = performAction;
exports.getMatchedRecords = getMatchedRecords;
exports.empQuery = empQuery;
exports.dateQuery = dateQuery;
exports.bvrgQuery = bvrgQuery;
exports.performSave = performSave;
exports.performQuery = performQuery;
