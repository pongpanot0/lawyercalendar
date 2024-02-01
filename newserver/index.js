const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3123;
const bodyParser = require("body-parser");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc"); // ปลั๊กอินสำหรับการคำนวณเวลา UTC
const timezone = require("dayjs/plugin/timezone"); // ปลั๊กอินสำหรับการจัดการโซนเวลา
dayjs.extend(utc);
dayjs.extend(timezone);

// ตั้งค่าโซนเวลาเริ่มต้นเป็น 'Asia/Bangkok' (ไทย)
dayjs.tz.setDefault("Asia/Bangkok");
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
const fs = require("fs");

fs.readdirSync("routes").forEach(function (file) {
  if (file[0] == ".") return;
  var routeName = file.substr(0, file.indexOf("."));
  require("./routes/" + routeName)(app);
});
const newDate = dayjs(new Date).format('MMYY')


// Read SQL script


app.listen(PORT, () => {
  console.log(`Example app listening at http://0.0.0.0:${PORT}`);
});
