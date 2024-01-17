const insurancedtype = require("../controller/insurancedtype");
module.exports = function (app) {
  app.post(`/insurancedtype/create`, insurancedtype.createinsurance_type);
  app.get(`/insurancedtype/get`, insurancedtype.getinsurance_type);
};
