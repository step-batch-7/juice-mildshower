const fs = require("fs");

const convertDateStrToObj = function(record) {
  record.date = new Date(record.date);
  return record;
};

const getLogs = function(path, readerFunc, existanceChecker) {
  let logs = [];
  if (existanceChecker(path)) {
    logs = JSON.parse(readerFunc(path, "utf8"));
  }
  return logs.map(convertDateStrToObj);
};

const updateLogs = function(path, content, writeFunc) {
  const stringForm = JSON.stringify(content);
  writeFunc(path, stringForm, "utf8");
};

const addRecordDetails = function(str, record) {
  const { empId, beverage, qty, date } = record;
  return str + `\n${empId},${beverage},${qty},${date.toJSON()}`;
};

const countQuantities = function(total, record) {
  return total + record.qty;
};

const getQueryMsg = function(transactions) {
  let message = "Employee ID,Beverage,Quantity,Date";
  message = transactions.reduce(addRecordDetails, message);
  const totalCount = transactions.reduce(countQuantities, 0);
  return message + "\nTotal: " + totalCount + " Juices";
};

const getSaveMsg = function(record) {
  const message = "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date";
  return addRecordDetails(message, record);
};

const doesKeyValMatch = function(key, val) {
  return function(record) {
    return record[key] === val;
  };
};

const doesDateMatch = function(date) {
  return function(record) {
    return record.date.toJSON().slice(0, 10) === date;
  };
};

exports.doesKeyValMatch = doesKeyValMatch;
exports.doesDateMatch = doesDateMatch;
exports.getQueryMsg = getQueryMsg;
exports.getSaveMsg = getSaveMsg;
exports.getLogs = getLogs;
exports.updateLogs = updateLogs;
exports.addRecordDetails = addRecordDetails;
exports.countQuantities = countQuantities;
exports.convertDateStrToObj = convertDateStrToObj;
