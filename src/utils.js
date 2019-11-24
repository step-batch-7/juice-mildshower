const fs = require("fs");

const getRecords = function(path, readerFunc, existanceChecker) {
  if (!existanceChecker(path)) {
    return {};
  }
  return JSON.parse(readerFunc(path, "utf8"));
};

const updateRecords = function(path, content) {
  const stringForm = JSON.stringify(content);
  fs.writeFileSync(path, stringForm, "utf8");
};

const addRecordDetails = function(str, record) {
  const { empId, beverage, qty, date } = record;
  return str + "\n" + empId + "," + beverage + "," + qty + "," + date;
};

const countQuantities = function(total, record) {
  return total + record.qty;
};

const getQueryMsg = function(records) {
  let message = "Employee ID,Beverage,Quantity,Date";
  message = records.reduce(addRecordDetails, message);
  const totalCount = records.reduce(countQuantities, 0);
  return message + "\nTotal: " + totalCount + " Juices";
};

const getSaveMsg = function(record) {
  const message = "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date";
  return addRecordDetails(message, record);
};

const insertEmpId = function(empId) {
  return function(record) {
    const { beverage, qty, date } = record;
    return { beverage, qty, date, empId };
  };
};

exports.insertEmpId = insertEmpId;
exports.getQueryMsg = getQueryMsg;
exports.getSaveMsg = getSaveMsg;
exports.getRecords = getRecords;
exports.updateRecords = updateRecords;
exports.addRecordDetails = addRecordDetails;
exports.countQuantities = countQuantities;
