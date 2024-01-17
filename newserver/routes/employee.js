const employee = require("../controller/employee");

module.exports = function (app) {
  app.post(`/employee/create`, employee.createEmployees);
  app.get(`/employee/get`, employee.getEmployees);
};
