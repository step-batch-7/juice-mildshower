const utils = require("./utils.js");
const handleInsput = require("./handleInput.js");

const insertNewRecord = function(transactionLogs, recordDetails, dateFunc) {
  recordDetails.date = dateFunc();
  transactionLogs.push(recordDetails);
  return { transactionLogs, savedLog: recordDetails };
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

const performAction = function(path, helperFuncs, userArgs) {
  const parsedArgs = handleInsput.parse(userArgs);

  if (!parsedArgs.isValid) {
    return "Please give a valid set of input.";
  }

  const { reader, writer, doesExist, dateFunc } = helperFuncs;
  const transactionLogs = utils.loadTransRecords(path, reader, doesExist);
  const { command, beverage, empId, qty, date } = parsedArgs;

  if (command == "--save") {
    const userOptions = { beverage, empId, qty };
    const saveResponse = insertNewRecord(
      transactionLogs,
      userOptions,
      dateFunc
    );
    utils.writeTransRecords(path, saveResponse.transactionLogs, writer);
    return utils.getSaveMsg(saveResponse.savedLog);
  }

  const userOptions = { empId, date, beverage };
  const matchedRecords = getMatchedRecords(transactionLogs, userOptions);
  return utils.getQueryMsg(matchedRecords);
};

exports.insertNewRecord = insertNewRecord;
exports.performAction = performAction;
exports.getMatchedRecords = getMatchedRecords;
exports.empQuery = empQuery;
exports.dateQuery = dateQuery;
exports.bvrgQuery = bvrgQuery;
