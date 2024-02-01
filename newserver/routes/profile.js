const profile = require("../controller/profile");

module.exports = function (app) {
    app.post("/get/profile", profile.getProfile);
}