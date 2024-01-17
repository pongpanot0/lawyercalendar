const axios = require("axios");
exports.CreateLineToken = async (req, res) => {
  try {
    const { code, state } = req.body;

    const clientId = "B2SDUcej5I0rIBAK0CPhfE";
    const redirectUrl = "http://localhost:3000/lawyer/Testsendline";
    const client_secret = "krClHJ4XzatYrnxxPEETES69eW8RI8AWfIQABx54YQh";
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUrl);
    params.append("client_id", clientId);
    params.append("client_secret", client_secret);

    const response = axios
      .post(
        `https://notify-bot.line.me/oauth/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUrl}&client_id=${clientId}&client_secret=${client_secret}`,

        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(async (res) => {
        const message = "TestData"
        const request = axios
          .post("https://notify-api.line.me/api/notify", `message=${message}`, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${res.data.access_token}`,
            },
          })
          .then((res) => {
            
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
