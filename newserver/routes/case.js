const casse = require("../controller/casse");

module.exports = function (app) {
  app.post(`/case/create`, casse.createCase);
  app.post(`/case/get`, casse.getCase);
  app.post(`/case/createClose`, casse.createCaseClose);
  app.post(`/case/open`, casse.updateOpencase);
  app.post(`/caseByid/get`, casse.getCaseByid);
  app.post(`/Expantime/create`, casse.createExpantime);
  app.post(`/Expantime/get`, casse.getExpantime);
  app.post(`/exportExcelCase`, casse.exportExcelCase);
  
};
