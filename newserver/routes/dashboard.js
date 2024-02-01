const dashboard = require("../controller/dashboard");

module.exports = function (app) {
  app.post(`/dashboard/get`, dashboard.getDashboard);
};
