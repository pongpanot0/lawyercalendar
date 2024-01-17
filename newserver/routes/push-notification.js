const pushnotification = require("../controller/push-notifications");

module.exports = function (app) {
  app.post(`/pushnotification`, pushnotification.sendPushNotification);
};
