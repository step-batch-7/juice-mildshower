const parse = function(userArgs) {
  const parsed = { command: userArgs[0] };
  for (let index = 1; index < userArgs.length; index += 2) {
    parsed[userArgs[index].slice(2)] = userArgs[index + 1];
  }
  parsed.qty = +parsed.qty;
  return parsed;
};

exports.parse = parse;
