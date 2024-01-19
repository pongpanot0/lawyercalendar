const customer = require("../controller/customer");

module.exports = function (app) {
  app.post(`/customer/create`, customer.createCustomer);
  app.get(`/customer/get`, customer.getCustomer);
  app.post(`/customerresponses/get`, customer.getCustomerresponses);
  app.post(`/customerresponses/get/all`, customer.getCustomerresponses);
};
