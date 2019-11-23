const fs = require("fs");

const getRecords = function(path) {
  if (!fs.existsSync(path)) {
    return { existance: false };
  }
  return { existance: true, content: JSON.parse(fs.readFileSync(path, "utf8")) };
};

const updateRecords = function(path, content) {
  const stringForm = JSON.stringify(content);
  fs.writeFileSync(path, stringForm, "utf8");
};

const getSaveMsg = function(record, empId) {
  let message = "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n";
  message = message + empId + "," + record.beverage + "," + record.qty + ",";
  return message + JSON.stringify(record.date).slice(1, -1);
};

exports.getSaveMsg = getSaveMsg;
exports.getRecords = getRecords;
exports.updateRecords = updateRecords;
