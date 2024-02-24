const api = require("../sql");
const jwt = require("jsonwebtoken");
const multer = require("multer");

function jwtVerify(params) {
  try {
    const token = jwt.decode(params.token);
    return token.employee_id;
  } catch (error) {
    return "Something Wrong";
  }
}
exports.getProfile = async (req, res) => {
  try {
    const header = req.headers;
    const user = jwtVerify(header);
    const sql = `select * from employees where employee_id=${user}`;
    const query = await api(sql);
    res.send({
      status: 200,
      data: query,
    });
  } catch (error) {
    console.log(error.message);
  }
};
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
exports.updateProfile = async (req, res) => {
  try {
    const header = req.headers;
    const data = req.body.data;
    const user = jwtVerify(header);
    const sql = `update employees set employee_pic='${data}' where employee_id = ${user}`;
    const query = await api(sql);
    res.send({
      status: 200,
      data: query,
    });
  } catch (error) {
    console.log(error.message);
  }
};
