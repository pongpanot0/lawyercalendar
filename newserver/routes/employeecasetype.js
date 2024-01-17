const employeecasetype = require("../controller/employeecasetype");

module.exports = function (app) {
  app.post(`/employeecasetype/create`, employeecasetype.createemployeecasetype);
  app.get(`/employeecasetype/get`, employeecasetype.getemployeecasetype);
};
