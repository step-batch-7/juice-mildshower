const fs = require("fs");

const getLogs = function(path, readerFunc, existanceChecker) {
  if (!existanceChecker(path)) {
    return [];
  }
  return JSON.parse(readerFunc(path, "utf8"));
};

const updateLogs = function(path, content, writeFunc) {
  const stringForm = JSON.stringify(content);
  writeFunc(path, stringForm, "utf8");
};

const addRecordDetails = function(str, record) {
  const { empId, beverage, qty, date } = record;
  return str + `\n${empId},${beverage},${qty},${date}`;
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

const doesEmpIdMatch = function(empId) {
  return function(record) {
    return record.empId === empId;
  };
};

const doesDateMatch = function(date) {
  return function(record) {
    return record.date.slice(0, 10) === date;
  };
};

exports.doesEmpIdMatch = doesEmpIdMatch;
exports.doesDateMatch = doesDateMatch;
exports.getQueryMsg = getQueryMsg;
exports.getSaveMsg = getSaveMsg;
exports.getLogs = getLogs;
exports.updateLogs = updateLogs;
exports.addRecordDetails = addRecordDetails;
exports.countQuantities = countQuantities;
