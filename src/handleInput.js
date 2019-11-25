const isACommand = function(userArg) {
  return ["--save", "--query"].includes(userArg);
};

const isNotACommand = function(userArg) {
  return !["--save", "--query"].includes(userArg);
};

const isEqualTo = function(val) {
  return function(valToCheck) {
    return val === valToCheck;
  };
};

const parse2 = function(userArgs) {
  const commands = userArgs.filter(isACommand);
  if (commands.length == 0 || !commands.every(isEqualTo(commands[0]))) {
    return { validation: false };
  }
  const userOptions = userArgs.filter();
};

const parse = function(userArgs) {
  const command = userArgs[0];
  const beverage = userArgs[userArgs.indexOf("--beverage") + 1];
  const qty = +userArgs[userArgs.indexOf("--qty") + 1];
  const empId = userArgs[userArgs.indexOf("--empId") + 1];
  return { command, beverage, qty, empId };
};

exports.parse = parse;
