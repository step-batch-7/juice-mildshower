const isValidBvrg = function(optionArg) {
  return typeof optionArg === "string" && optionArg.length > 0;
};

const isValidDate = function(optArg) {
  const vldPttrn = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
  const isVldPttrn = vldPttrn.test(optArg);
  return isVldPttrn && JSON.stringify(new Date(optArg)).slice(1, 11) == optArg;
};

const isPositiveInt = function(optionArg) {
  return +optionArg > 0 && Number.isInteger(+optionArg);
};

const isValidCombo = function(parsedVals) {
  const isEmpGiven = Boolean(parsedVals.empId);
  const isDateGiven = Boolean(parsedVals.date);
  const isBvrgGiven = Boolean(parsedVals.beverage);
  const isQtyGiven = Boolean(parsedVals.qty);
  const cmd = parsedVals.command;
  const isVldSave = cmd == "--save" && isEmpGiven && isBvrgGiven && isQtyGiven;
  const isVldQuery =
    cmd == "--query" && (isDateGiven || isEmpGiven || isBvrgGiven);
  return isVldQuery || isVldSave;
};

const parse = function(userArgs) {
  const parsedArgs = { command: userArgs[0] };
  const pairValidFunc = {
    "--beverage": isValidBvrg,
    "--empId": isPositiveInt,
    "--qty": isPositiveInt,
    "--date": isValidDate
  };
  const validOpts = Object.keys(pairValidFunc);

  for (let index = 1; index < userArgs.length; index += 2) {
    const option = userArgs[index];
    const optionArg = userArgs[index + 1];
    const isValidPair =
      validOpts.includes(option) && pairValidFunc[option](optionArg);
    if (!isValidPair) {
      return { isValid: false };
    }
    parsedArgs[userArgs[index].slice(2)] = userArgs[index + 1];
  }

  parsedArgs.qty && (parsedArgs.qty = +parsedArgs.qty);
  parsedArgs.empId && (parsedArgs.empId = +parsedArgs.empId);
  parsedArgs.isValid = isValidCombo(parsedArgs);
  return parsedArgs;
};

exports.parse = parse;
exports.isValidBvrg = isValidBvrg;
exports.isValidDate = isValidDate;
exports.isPositiveInt = isPositiveInt;
