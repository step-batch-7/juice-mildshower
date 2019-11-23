const utils = require("./src/utils.js");
const recordSystem = require("./src/recordSystem.js");

const main = function() {
  const userArgs = process.argv.slice(2);

  const dateStamp = new Date();
  const transactionDetails = recordSystem.performTransaction(path, userArgs, dateStamp);
  const printableStr = utils.getPrintableStr[process.argv[2]](transactionDetails);
  console.log(printableStr);
};
