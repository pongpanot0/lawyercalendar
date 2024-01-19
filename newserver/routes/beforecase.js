const beforecase = require("../controller/beforecase");


module.exports = function (app) {
  app.post(`/beforecase/create`, beforecase.createbeforebasetype);
  app.get(`/beforecase/get`, beforecase.getbeforebasetype);
  app.post(`/beforecasedocuments/create`, beforecase.createbeforecase);
  app.get(`/beforecasedocuments/get`, beforecase.getbeforecaseDocuments);
  app.post(`/beforecaseDocumentsbyID/get`, beforecase.getbeforecaseDocumentsbyID);
  app.post(`/BeforeCaseTocase/create`, beforecase.createBeforeCaseTocase);
  app.post(`/beforecase/update`, beforecase.updateBeforecase);
  
};
