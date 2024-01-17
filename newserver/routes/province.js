const province = require("../controller/province");
module.exports = function (app) {
  app.post("/get/tambon", province.getTambon);
  app.post("/get/amphure", province.getAmphure);
  app.post("/get/district", province.getdistrict);
  app.post("/get/Province", province.getProvince);
  
};
