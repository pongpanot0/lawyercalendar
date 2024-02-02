var admin = require("firebase-admin");

var serviceAccount = require("../google-services.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const messaging = admin.messaging();

exports.sendPushNotification = (req, res, next) => {
  try {
    sendNotification(req.body.token, req.body.title, req.body.body);
    res.send({
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};

function sendNotification(token, title, body) {
  return messaging.send({
    token:
      "fgwTpManSGyGqT6QJId34S:APA91bH7g9HbokAZoLp5hFN8epwza5z_bamrxVos3TIqclPjrElDAvPDSd9B9NlP4rGMX4px41KA4jte5rQKYOAHs22dlNBF9axpXqCllDEbdGphhD7b0_ppNgk4Z87SmEPNYyrDy4Xn",
    notification: {
      title: title,
      body: body,
    },
  });
}

// Usage: Replace 'YOUR_FCM_TOKEN_HERE' with the actual FCM token of the recipient
