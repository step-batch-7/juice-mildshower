const utils = require("./src/utils.js");
const transaction = require("./src/transaction.js");
const fs = require("fs");

const main = function() {
  const userArgs = process.argv.slice(2);
  const path = "./beverageConsumption.json";
  const message = transaction.performTransaction(
    path,
    fs.readFileSync,
    fs.existsSync,
    userArgs,
    function() {
      return new Date();
    }
  );
  console.log(message);
};

main();
