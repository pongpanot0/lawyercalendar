const line = require("../controller/line");

module.exports = function (app) {
  app.post(`/line/create`, line.CreateLineToken);
};
