const casetype = require("../controller/casetype");

module.exports = function (app) {
  app.post(`/casetype/create`, casetype.createCaseType);
  app.get(`/casetype/get`, casetype.getCaseType);
};
