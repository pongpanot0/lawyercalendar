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
    token:
      "dhsP7XNgRMODajvFomwb7V:APA91bGkyy6xrDsN3pss7rYTzCGHWUwlbd2HBs3aHBIk4h1Gic4qj4eVE5n8-oBcdkEVNPkGW6uTBVR3GQuukfqfIPRgk4jBAEEnvh2KVr-250228ER9o9znj5uZmC4dOt6wsJPCYCjX",
    notification: {
      title: title,
      body: body,
    },
  });
}

// Usage: Replace 'YOUR_FCM_TOKEN_HERE' with the actual FCM token of the recipient
