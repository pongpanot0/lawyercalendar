const casse = require("../controller/casse");

module.exports = function (app) {
  app.post(`/case/create`, casse.createCase);
  app.get(`/case/get`, casse.getCase);
  app.post(`/caseByid/get`, casse.getCaseByid);
};
