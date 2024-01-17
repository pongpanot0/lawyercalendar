const customer = require("../controller/customer");

module.exports = function (app) {
  app.post(`/customer/create`, customer.createCustomer);
    app.get(`/customer/get`, customer.getCustomer);
};
