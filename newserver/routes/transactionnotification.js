const transactionnotification = require("../controller/transactionnotification");

module.exports = function (app) {
  app.post(
    `/transactionnotification/get`,
    transactionnotification.getTransaction
  );
};
