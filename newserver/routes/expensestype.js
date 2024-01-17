const expensestype = require("../controller/expensestype");
module.exports = function (app) {
  app.post(`/expenses/create`, expensestype.createexpenses);
  app.get(`/expenses/get`, expensestype.getexpenses);
};
