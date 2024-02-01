const beforecase = require("../controller/beforecase");


module.exports = function (app) {
  app.post(`/beforecase/create`, beforecase.createbeforebasetype);
  app.get(`/beforecase/get`, beforecase.getbeforebasetype);
  app.get(`/tsbref/get`, beforecase.gettsbref);
  
  app.post(`/beforecasedocuments/createClose`, beforecase.createCloseBeforecase);
  app.post(`/beforecasedocuments/updateOpenBeforecase`, beforecase.updateOpenBeforecase);
  
  app.post(`/beforecasedocuments/create`, beforecase.createbeforecase);
  app.get(`/beforecasedocuments/get`, beforecase.getbeforecaseDocuments);
  app.post(`/beforecaseDocumentsbyID/get`, beforecase.getbeforecaseDocumentsbyID);
  app.post(`/BeforeCaseTocase/create`, beforecase.createBeforeCaseTocase);
  app.post(`/beforecase/update`, beforecase.updateBeforecase);
  
};
