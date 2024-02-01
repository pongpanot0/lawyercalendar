const ExcelJS = require("exceljs");
const fs = require("fs");
const api = require("../sql");
const moment = require("moment");
require('moment/locale/th'); // Import Thai locale

moment.locale('th'); // Set locale to Thai
exports.exportExcel = async (req, res) => {
  try {
    const data = req.body.data;
    const sql = `select * from expensestype`;
    const query = await api(sql);
    let whereClause = `WHERE PaymentStatus = 1 and STR_TO_DATE(PaymentDate, '%Y-%m-%dT%H:%i:%s.000Z') 
    BETWEEN '${data.startDate}' AND '${data.endDate}'`;
    let paycase;
    let expensescase;
    let paidtypecase;
 
    if (data.payertoapi !== "ทั้งหมด") {
      paycase = `ce.Payer = ${data.payertoapi}`;
    } else {
      paycase = "";
    }
    if (data.expensestoapi !== "ทั้งหมด") {
      expensescase = `ce.expensesType = ${data.expensestoapi}`;
    } else {
      expensescase = "";
    }
    if (data.paid_type2toapi !== "ทั้งหมด") {
      paidtypecase = `ce.paid_type = ${data.paid_type2toapi};`;
    } else {
      paidtypecase = "";
    }
    const conditions = [paycase, expensescase, paidtypecase].filter(
      (condition) => condition !== ""
    );

    // เชื่อมเงื่อนไขด้วย AND
    if (conditions.length > 0) {
      whereClause = "WHERE " + conditions.join(" AND ");
    }
    const sqlforexpenses = `select ce.*,et.expensesType_name,e.employee_firstname,e.employee_lastname
    from caseexpenses ce 
    join employees e on (e.employee_id = ce.Payer)
    join expensestype et on (ce.expensesType = et.expensesType_id)
    ${whereClause}
    `;

    const queryforexpenses = await api(sqlforexpenses);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Merge cells from A1 to B1

    // Set the value of the merged cell
    worksheet.getCell("A1").value = "เดอะสยามบาร์ริสเตอร์ส จำกัด";
    worksheet.getCell("A2").value = "เบิกเงินสดย่อย";
    worksheet.getCell("A3").value =
      `รางงานสรุปค่าใช้จ่าย ระหว่างวันที่ ${moment(data.startDate).add('543','year').format("DD MMMM YYYY")} ถึง ${moment(data.endDate).add('543','year').format("DD MMMM YYYY")}`;
    worksheet.getCell("H2").value = "PC No. 015-11-2023-SU";
    worksheet.getCell("H3").value = `${queryforexpenses[0]?.employee_firstname} ${queryforexpenses[0]?.employee_lastname}`;
    // Add some sample data


    worksheet.addRow([]);
    const headerRow = worksheet.addRow([
      "วันที่",
      "รายละเอียด",
      "อ้างอิง",
      ...query.map((type) => type.expensesType_name),
    ]);
    headerRow.height = 30; // Adjust the height as needed
    headerRow.width = 70; // Adjust the height as needed
    headerRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      cell.alignment = { vertical: "middle", horizontal: "center" };
      if (colNumber === 2) {
        worksheet.getColumn(colNumber).width = 40;
      } else {
        worksheet.getColumn(colNumber).width = 20;
      }
      cell.font = { size: 14 };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Add a row with date, details, and data from the loop
    queryforexpenses.forEach((packet) => {
      const dataRow = worksheet.addRow([
        moment(packet.PaymentDate).format("DD/MM/YYYY"),
        packet.expenses_ref || packet.Caseref,
        packet.expenses_ref || packet.Caseref,
        ...query.map((p) =>
          p.expensesType_id === packet.expensesType ? packet.expenses : ""
        ),
      ]);
      dataRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.alignment = { vertical: "middle", horizontal: "center" };
        // Add border to the cells in the data row
        cell.font = { size: 14 };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        // Adjust column widths as needed for the data row
        if (colNumber === 2) {
          worksheet.getColumn(colNumber).width = 40;
        } else {
          worksheet.getColumn(colNumber).width = 20;
        }
      });
    });
    const sumRow = worksheet.addRow([
      "รวม",
      "",
      "",
      ...query.map((type) => {
        const sum = queryforexpenses.reduce((acc, packet) => {
          return (
            acc +
            (packet.expensesType === type.expensesType_id ? packet.expenses : 0)
          );
        }, 0);
        return sum !== 0 ? sum : "-";
      }),
    ]);

    sumRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      cell.alignment = { vertical: "middle", horizontal: "center" };
      // Add border to the cells in the sum row
      cell.font = { size: 14 };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      // Adjust column widths as needed for the sum row
      if (colNumber === 2) {
        worksheet.getColumn(colNumber).width = 40;
      } else {
        worksheet.getColumn(colNumber).width = 20;
      }
    });
    worksheet.addRow([]);
    const deductsum = queryforexpenses
      .filter((packet) => packet.paid_type === 1)
      .reduce((acc, packet) => acc + packet.expenses, 0);
    const totalSum = queryforexpenses
      .filter((packet) => packet.paid_type === 2)
      .reduce((acc, packet) => acc + packet.expenses, 0);

    worksheet.addRow(["", "", "รวมเบิก", deductsum]);
    worksheet.addRow([
      `ผู้เบิก ${queryforexpenses[0]?.employee_firstname} ${queryforexpenses[0]?.employee_lastname}`,
      "",
      "สำรองจ่าย",
      totalSum  ,
      "โอนวันที่.../../..",
    ]);
    worksheet.getColumn("A").width = 30; // Adjust the width as needed
    worksheet.addRow([
      `วันที่ ..../.../...`,
      "วันที่ ..../.../...",
      "คงเหลือ",
      totalSum-  deductsum ,
    ]);
    workbook.eachSheet((sheet) => {
      sheet.eachRow({ includeEmpty: true }, (row) => {
        row.eachCell((cell) => {
          cell.font = { size: 12 };
        });
      });
    });
    // Save the workbook to a file
    const filePath = "output.xlsx";
    workbook.xlsx
      .writeFile(filePath)
      .then(() => {
        const fileBuffer = fs.readFileSync(filePath);

        // แปลง Buffer เป็น Base64
        const base64File = fileBuffer.toString("base64");
        res.send(base64File);

        // ลบไฟล์ Excel หลังจากส่ง Base64 ไปยัง React
        fs.unlinkSync(filePath);
      })
      .catch((error) => {
        console.error("Error creating Excel file:", error);
      });
  } catch (error) {
    console.error("Error creating Excel file:", error);
  }
};
