const fs = require("fs");

const insertEmpId = function(empId) {
  return function(record) {
    const { beverage, qty, date } = record;
    return { beverage, qty, date, empId };
  };
};

const getRecords = function(path, readerFunc, existanceChecker) {
  if (!existanceChecker(path)) {
    return {};
  }
  return JSON.parse(readerFunc(path, "utf8"));
};

const updateRecords = function(path, content, writeFunc) {
  const stringForm = JSON.stringify(content);
  writeFunc(path, stringForm, "utf8");
};

const addRecordDetails = function(str, record) {
  const { empId, beverage, qty, date } = record;
  return str + "\n" + empId + "," + beverage + "," + qty + "," + date;
};

const countQuantities = function(total, record) {
  return total + record.qty;
};

const getQueryMsg = function(transactions) {
  const recordsWithEmpId = transactions.orders.map(insertEmpId(transactions.empId));
  let message = "Employee ID,Beverage,Quantity,Date";
  message = recordsWithEmpId.reduce(addRecordDetails, message);
  const totalCount = recordsWithEmpId.reduce(countQuantities, 0);
  return message + "\nTotal: " + totalCount + " Juices";
};

const getSaveMsg = function(record) {
  const message = "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date";
  return addRecordDetails(message, record);
};

exports.insertEmpId = insertEmpId;
exports.getQueryMsg = getQueryMsg;
exports.getSaveMsg = getSaveMsg;
exports.getRecords = getRecords;
exports.updateRecords = updateRecords;
exports.addRecordDetails = addRecordDetails;
exports.countQuantities = countQuantities;
