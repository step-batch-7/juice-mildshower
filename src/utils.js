const fs = require("fs");

const convertDateStrToObj = function(record) {
  record.date = new Date(record.date);
  return record;
};

const loadTransRecords = function(path, readerFunc, existanceChecker) {
  let logs = [];
  if (existanceChecker(path)) {
    logs = JSON.parse(readerFunc(path, "utf8"));
  }
  return logs.map(convertDateStrToObj);
};

const writeTransRecords = function(path, transRecords, writeFunc) {
  const contentToWrite = JSON.stringify(transRecords);
  writeFunc(path, contentToWrite, "utf8");
};

const addRecordAsRow = function(currRows, record) {
  const { empId, beverage, qty, date } = record;
  return currRows + `\n${empId},${beverage},${qty},${date.toJSON()}`;
};

const countQuantities = function(total, record) {
  return total + record.qty;
};

const getQueryMsg = function(transactionRecords) {
  let header = "Employee ID,Beverage,Quantity,Date";
  const rows = transactionRecords.reduce(addRecordAsRow, header);
  const total = transactionRecords.reduce(countQuantities, 0);
  const suffix = (total > 1 && "Juices") || "Juice";
  return `${rows}\nTotal: ${total} ${suffix}`;
};

const getSaveMsg = function(record) {
  const header = "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date";
  return addRecordAsRow(header, record);
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
exports.loadTransRecords = loadTransRecords;
exports.writeTransRecords = writeTransRecords;
exports.addRecordAsRow = addRecordAsRow;
exports.countQuantities = countQuantities;
exports.convertDateStrToObj = convertDateStrToObj;
