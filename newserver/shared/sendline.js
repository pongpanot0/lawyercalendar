const axios = require("axios");

// Function to send the Axios POST request
function sendLineMessage(message, accessToken) {
  return new Promise((resolve, reject) => {
    axios
      .post("https://notify-api.line.me/api/notify", `message=${message}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        resolve(response.data);
        return;
      })
      .catch((error) => {
        reject(error);
        return;
      });
  });
}

module.exports = { sendLineMessage };
