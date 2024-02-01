const employeejob = require("../controller/employeejob");
module.exports = function (app) {
  app.post(`/employeejob/create`, employeejob.createemployeejob);
};
