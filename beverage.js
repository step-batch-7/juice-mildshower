const transaction = require("./src/transaction.js");
const fs = require("fs");

const main = function() {
  const userArgs = process.argv.slice(2);
  const path = "./beverageTransactions.json";
  const helperFuncs = {
    reader: fs.readFileSync,
    writer: fs.writeFileSync,
    doesExist: fs.existsSync,
    dateFunc: () => new Date().toJSON()
  };
  const message = transaction.performAction(path, helperFuncs, userArgs);
  console.log(message);
};

main();
