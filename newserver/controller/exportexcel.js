const ExcelJS = require("exceljs");
const fs = require("fs");
const api = require("../sql");
const moment = require("moment");
exports.exportExcel = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");
   

    // Merge cells from A1 to B1

    // Set the value of the merged cell
    worksheet.getCell("A1").value = "เดอะสยามบาร์ริสเตอร์ส จำกัด";
  
    worksheet.getCell("A2").value = "เบิกเงินสดย่อย";
    worksheet.getCell("A3").value =
      "รางงานสรุปค่าใช้จ่าย ระหว่างวันที่ 12 ตุลาคม ถึง 9 พฤศจิกายน พ.ศ. 2566";
    worksheet.getCell("H2").value = "PC No. 015-11-2023-SU";
    worksheet.getCell("H3").value = "นางสาว สุชัญญา อยู่ม่วง";
    // Add some sample data
    const sql = `select * from expensestype`;
    const query = await api(sql);
    const sqlforexpenses = `select c.Caseref,ce.*,et.expensesType_name,e.employee_firstname,e.employee_lastname  
    from caseexpenses ce 
    join cases c on  (ce.CaseID = c.CaseID)
    join employees e on (e.employee_id = ce.Payer)
    join expensestype et on (ce.expensesType = et.expensesType_id)

    `;
    const queryforexpenses = await api(sqlforexpenses);

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
    const totalSum = queryforexpenses.reduce(
      (acc, packet) => acc + packet.expenses,
      0
    );
    worksheet.addRow(["", "", "รวมเบิก", totalSum]);
    worksheet.addRow([
      `ผู้เบิก ${queryforexpenses[0]?.employee_firstname} ${queryforexpenses[0]?.employee_lastname}`,
      "",
      "สำรองจ่าย",
      totalSum,
      "โอนวันที่.../../..",
    ]);
    worksheet.getColumn('A').width = 30; // Adjust the width as needed
    worksheet.addRow([
      `วันที่ ..../.../...`,
      "วันที่ ..../.../...",
      "คงเหลือ",
      totalSum,
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
        res.send("Excel file created successfully");
        console.log("Excel file created successfully");
      })
      .catch((error) => {
        console.error("Error creating Excel file:", error);
      });
  } catch (error) {
    console.error("Error creating Excel file:", error);
  }
};
