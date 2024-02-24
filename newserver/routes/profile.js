const profile = require("../controller/profile");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const api = require("../sql");
const fs = require('fs')
function jwtVerify(params) {
  try {
    const token = jwt.decode(params.token);
    return token.employee_id;
  } catch (error) {
    return "Something Wrong";
  }
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set destination folder where uploaded files will be stored
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Set file name of the uploaded file
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create multer instance with configuration
const upload = multer({ storage: storage });

module.exports = function (app) {
  app.post("/get/profile", profile.getProfile);
  app.post("/edit/profile", profile.editprofile);
  
  app.post("/update/profile", upload.single("image"), async (req, res) => {
    try {
      const header = req.headers;
      const user = jwtVerify(header);
      const imagePath = req.file.path; // Path to the uploaded image file
      
      var imageAsBase64 = fs.readFileSync(imagePath, "base64");
      const sql = `update employees set employee_pic='${imageAsBase64}' where employee_id = ${user}`;
      const query = await api(sql);
      res.status(200).json({
        status: 200,
        data: query,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};
