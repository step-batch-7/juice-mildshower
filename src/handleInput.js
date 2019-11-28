const isValidBvrg = function(optVal) {
  return typeof optVal === "string" && optVal.length > 0;
};

const isValidDate = function(optVal) {
  const vldPttrn = RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
  const isVldPttrn = vldPttrn.test(optVal);
  return isVldPttrn && JSON.stringify(new Date(optVal)).slice(1, 11) == optVal;
};

const isPosInt = function(optVal) {
  return +optVal > 0 && Number.isInteger(+optVal);
};

const isValidComb = function(parsedVals) {
  const isEmpGiven = Boolean(parsedVals.empId);
  const isDateGiven = Boolean(parsedVals.date);
  const isBvrgGiven = Boolean(parsedVals.beverage);
  const isQtyGiven = Boolean(parsedVals.qty);
  const cmd = parsedVals.command;
  const isValidCmd = ["--save", "--query"].includes(cmd);
  const isVldSave = cmd == "--save" && isEmpGiven && isBvrgGiven && isQtyGiven;
  const areQueryOptsEnough = isDateGiven || isEmpGiven || isBvrgGiven;
  const isVldQuery = cmd == "--query" && areQueryOptsEnough;
  return isValidCmd && (isVldQuery || isVldSave);
};

const parse = function(userArgs) {
  const parsed = { command: userArgs[0] };
  const validOpts = ["--beverage", "--empId", "--qty", "--date"];
  const pairValidFunc = {
    "--beverage": isValidBvrg,
    "--empId": isPosInt,
    "--qty": isPosInt,
    "--date": isValidDate
  };

  for (let index = 1; index < userArgs.length; index += 2) {
    const opt = userArgs[index];
    const optVal = userArgs[index + 1];
    if (!validOpts.includes(opt) || !pairValidFunc[opt](optVal)) {
      return { validation: false };
    }
    parsed[userArgs[index].slice(2)] = userArgs[index + 1];
  }

  parsed.qty && (parsed.qty = +parsed.qty);
  parsed.empId && (parsed.empId = +parsed.empId);
  parsed.validation = isValidComb(parsed);
  return parsed;
};

exports.parse = parse;
exports.isValidBvrg = isValidBvrg;
exports.isValidDate = isValidDate;
exports.isPosInt = isPosInt;
