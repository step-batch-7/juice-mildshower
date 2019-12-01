const fs = require("fs");
const transaction = require("./src/transaction.js");
const config = require("./src/config");

const main = function() {
  const userArgs = process.argv.slice(2);
  const path = config.getPath(process.env);
  const helperFuncs = {
    reader: fs.readFileSync,
    writer: fs.writeFileSync,
    doesExist: fs.existsSync,
    dateFunc: config.getDateFunc(process.env)
  };
  const message = transaction.performAction(path, helperFuncs, userArgs);
  console.log(message);
};

main();
