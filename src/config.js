const getPath = function(env) {
  return env.JS_STORE_PATH || "./data/beverageTransactions.json";
};

const getDateFunc = function(env) {
  return env.JS_DATE ? () => new Date(env.JS_DATE) : () => new Date();
};

exports.getPath = getPath;
exports.getDateFunc = getDateFunc;
