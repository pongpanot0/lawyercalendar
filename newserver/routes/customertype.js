const customertype = require("../controller/customertype");

module.exports = function (app) {
  app.post(`/customertype/create`, customertype.createCustomertype);
  app.get(`/customertype/get`, customertype.getCustomertype);
};
