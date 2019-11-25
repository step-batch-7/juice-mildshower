const transaction = require("./src/transaction.js");
const fs = require("fs");

const main = function() {
  const userArgs = process.argv.slice(2);
  const path = "./beverageConsumption.json";
  const dateFunc = function() {
    return new Date().toJSON();
  };
  const message = transaction.performTransaction(
    path,
    fs.readFileSync,
    fs.existsSync,
    userArgs,
    dateFunc
  );
  console.log(message);
};

main();
