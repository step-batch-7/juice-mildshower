const parse = function(userArgs) {
  const command = userArgs[0];
  const beverage = userArgs[userArgs.indexOf("--beverage") + 1];
  const qty = +userArgs[userArgs.indexOf("--qty") + 1];
  const empId = userArgs[userArgs.indexOf("--empId") + 1];
  return { command, beverage, qty, empId };
};

exports.parse = parse;
