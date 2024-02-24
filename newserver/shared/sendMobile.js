var admin = require("firebase-admin");
var serviceAccount = require("../google-services.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

function sendNotification(token, title, body) {
  return messaging.send({
    token: token,
    notification: {
      title: title,
      body: body,
    },
  });
}
// Function to send the Axios POST request
function sendMobileNotify(token, title, body) {
  return new Promise((resolve, reject) => {
    sendNotification(token, title, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}

module.exports = { sendMobileNotify };
