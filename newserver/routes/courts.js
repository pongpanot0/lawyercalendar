const courts = require("../controller/courts");

module.exports = function (app) {
  app.get(`/courts/get`, courts.getcourts);
};
