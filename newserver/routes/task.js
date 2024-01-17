const task = require("../controller/task");

module.exports = function (app) {
  app.post(`/task/create`, task.createTask);
  app.post(`/task/get`, task.getTask);
  app.post(`/task/update`, task.upDateTask);
  
};
