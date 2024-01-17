const role = require("../controller/role");

module.exports = function (app) {
  app.get(`/role/get`, role.getRole);
};
