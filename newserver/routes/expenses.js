const expenses = require("../controller/expenses");
module.exports = function (app) {
  app.post(`/caseexpenses/create`, expenses.createxpenses);
  app.post(`/caseexpenses/get`, expenses.getexpenses);
};
