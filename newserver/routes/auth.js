const auth = require("../controller/auth");

module.exports = function (app) {
  app.post(`/register`, auth.creteUsers);
  app.post(`/login`, auth.login);
  
};

