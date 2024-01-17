const expenses = require("../controller/expenses");
module.exports = function (app) {
  app.post(`/caseexpenses/create`, expenses.createxpenses);
  app.get(`/caseexpenses/get`, expenses.getexpenses);
};
