
const exportExcel = require("../controller/exportexcel");
module.exports = function (app) {
  app.post(`/excel/export`, exportExcel.exportExcel);
  app.get(`/expenses/get`, exportExcel.exportExcel);
};
