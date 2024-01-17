const setting = require("../controller/setting");

module.exports = function (app) {
  app.post(`/setting/create`, setting.createsetting);
  app.post(`/setting/get`, setting.getsetting);
  
};
