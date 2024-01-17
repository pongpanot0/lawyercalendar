const auth = require("../controller/auth");

module.exports = function (app) {
  app.post(`/user/create`, auth.creteUsers);
  
  
};

