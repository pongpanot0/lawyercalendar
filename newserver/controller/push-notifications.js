var admin = require("firebase-admin");

var serviceAccount = require("../google-services.json");



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const messaging = admin.messaging();

exports.sendPushNotification = (req, res, next) => {
  try {
    sendNotification(req.body.token, "Test", "test");
    res.send({
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};

function sendNotification(token, title, body) {
  return messaging.send({
    token: "e-PtjViBQuaUPyrexjf7Qp:APA91bGPirsBAXO_0LadFa8XKeN6DwYy39mNTArN-F2RnxmiXB_mFKeGXf6DzMPAesnoglDMuy07IXs0dYFutPUlYfIhVYJIHUASD3Gqxlt2Ahd49Y15L8WIfDFA2UbRtkkrqm1LjwdQ",
    notification: {
      title: title,
      body: body,
    },
  });
}

// Usage: Replace 'YOUR_FCM_TOKEN_HERE' with the actual FCM token of the recipient
