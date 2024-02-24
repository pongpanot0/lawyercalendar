const api = require("../sql");
const ExcelJS = require("exceljs");
const moment = require("moment");
const fs = require("fs");
const jwt = require("jsonwebtoken");
require("moment/locale/th"); // Import Thai locale

moment.locale("th"); // Set locale to Thai

function jwtVerify(params) {
  try {
    const token = jwt.decode(params.token);
    return token.employee_id;
  } catch (error) {
    return "Something Wrong";
  }
}
exports.createCase = async (req, res) => {
  try {
    const {
      caseref,
      caseType,
      courtID,
      clientID,
      Customer_ref,
      Policy_ref,
      ExpiryDate,
    } = req.body.data.caseData;
    const responsiblePersonData = req.body.data.responsiblePersonData;

    const sql = `insert into cases (ClientID,CaseTypeID,CourtID,ExpiryDate,Caseref,Customer_ref,Policy_ref) values ('${clientID}','${caseType}','${courtID}','${ExpiryDate}','${caseref}','${Customer_ref}','${Policy_ref}')`;
    const query = await api(sql);

    for (
      let index = 0;
      index < responsiblePersonData.inputFields.length;
      index++
    ) {
      const element = responsiblePersonData.inputFields[index];

      const sqlresponsibleData = `insert into caselawyer (caselawyer_case_id,caselawyer_employee_id,caselawyer_employee_type) values ('${query.insertId}','${element.value}','${element.age}')`;
      const queryresponsibleData = await api(sqlresponsibleData);
    }

    res.send({
      status: 200,
      date: query,
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
exports.createCaseClose = async (req, res) => {
  try {
    const { case_close_detail, tsb_ref } = req.body.data;
    const sql = `update cases set case_close= 1,case_close_detail='${case_close_detail}'   where tsb_ref='${tsb_ref}'`;
    const sql2 = `update casedocuments set isclose= 1   where tsb_ref='${tsb_ref}'`;
    const querysql2 = await api(sql2);
    const query = await api(sql);

    res.send({
      status: 200,
      date: query,
    });
  } catch (error) {
    res.send({
      status: 400,
      data: error.message,
    });
  }
};

exports.updateOpencase = async (req, res) => {
  try {
    const tsb_ref = req.body.data;
    const sql = `update cases set case_close= 0  where tsb_ref='${tsb_ref}'`;
    const sql2 = `update casedocuments set isclose= 0   where tsb_ref='${tsb_ref}'`;
    const querysql2 = await api(sql2);
    const query = await api(sql);
    res.send({
      status: 200,
      date: query,
    });
  } catch (error) {
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
exports.getExpantime = async (req, res) => {
  try {
    const tsb_ref = req.body.data;

    const sql = `select * from  case_expantime where case_id='${tsb_ref}'`;
    const query = await api(sql);

    res.send({
      status: 200,
      date: query,
    });
  } catch (error) {
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
exports.createExpantime = async (req, res) => {
  try {
    const { case_expantime_date, case_expantime_remark, tsb_ref } =
      req.body.data;

    const sql = `insert into case_expantime (case_expantime_date,case_expantime_remark,case_id) values
    ('${case_expantime_date}','${case_expantime_remark}','${tsb_ref}') `;

    const update = `update cases set ReciveWarrantDate='${case_expantime_date}' where CaseID=${tsb_ref}`;
    const queryupdate = await api(update);
    const query = await api(sql);
    res.send({
      status: 200,
      date: query,
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
exports.getCase = async (req, res) => {
  try {
    const data = req.body.data;
    const users = jwtVerify(req.headers);
    let casewhen;
    if (data !== "mobile") {
      casewhen = "ORDER BY CONVERT(newDate, DATE) DESC";
    } else {
      casewhen = ` left JOIN caselawyer cl ON a.CaseID = cl.caselawyer_case_id where  cl.caselawyer_employee_id = ${users} ORDER BY CONVERT(newDate, DATE) DESC;`;
    }
    const sql = `SELECT a.*, c.ClientName, ct.CaseTypeName,tls.timeline_status_name,ctl.case_timebar_incoming,
     DATE_FORMAT(ctl.case_timebar_incoming, '%Y-%m-%d 00:00:00.000Z') AS newDate
    FROM cases a
    left JOIN clients c ON a.ClientID = c.ClientID
    left JOIN casetypes ct ON a.CaseTypeID = ct.CaseTypeID
    left JOIN courts co ON a.CourtID = co.CourtID
    left JOIN case_timeline ctl ON a.case_status = ctl.case_timeline_id 
    left JOIN timeline_status tls ON ctl.case_timebar_status = tls.timeline_status_id
    ${casewhen};`;
    const query = await api(sql);
    console.log(query);
    res.send({
      status: 200,
      data: query,
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      status: 400,
      data: error.message,
    });
  }
};

exports.getCaseByid = async (req, res) => {
  try {
    const CaseID = req.body.data;
    const sql = `SELECT
   a.*, c.ClientName, ct.CaseTypeName,tls.timeline_status_name,ctl.case_timebar_incoming
  FROM
    cases a
  LEFT JOIN clients c ON (a.ClientID = c.ClientID)
  LEFT JOIN casetypes ct ON (a.CaseTypeID = ct.CaseTypeID)
  JOIN courts co ON (a.CourtID = co.CourtID)
  left JOIN case_timeline ctl ON a.case_status = ctl.case_timeline_id 
  left JOIN timeline_status tls ON ctl.case_timebar_status = tls.timeline_status_id
  WHERE
    a.CaseID = ${CaseID}`;
    const query = await api(sql);

    const sqlCaselawyer = `select cl.caselawyer_case_id,
    eplt.employeescasetype_name as employeescasetype_name,
    CONCAT(epl.employee_firstname, ' ', epl.employee_lastname) as name
     from caselawyer cl 
    LEFT JOIN employees epl ON (cl.caselawyer_employee_id = epl.employee_id)
    LEFT JOIN employeescasetype eplt ON (eplt.employeescasetype_id = cl.caselawyer_employee_type)
    where cl.caselawyer_case_id=${CaseID}`;

    const querysqlCaselawyer = await api(sqlCaselawyer);

    const sqlcaseNotice = `select 
    cn.*,CONCAT(ep.employee_firstname, ' ', ep.employee_lastname) as name 
    from casenotice cn  
    LEFT JOIN employees ep ON (cn.CaseNotice_lawyer_id = ep.employee_id)
    where cn.CaseNotice_ref='${query[0]?.tsb_ref}'
    `;
    const querysqlcaseNotice = await api(sqlcaseNotice);

    const sqlcaseExpenses = `select cx.*,
    cxt.expensesType_name as expensesType_name,
    CONCAT(eplcx.employee_firstname, ' ', eplcx.employee_lastname) as name  
    from caseexpenses  cx 
    LEFT JOIN employees eplcx ON (cx.Payer = eplcx.employee_id)
    LEFT JOIN expensestype cxt ON (cx.expensesType = cxt.expensesType_id)
    where cx.expenses_ref='${query[0]?.tsb_ref}'
    `;
    const sqlcase_plainiff = `select * from case_plainiff where case_id =${CaseID}`;
    const sqlcase_defendant = `select * from case_defendant where case_id =${CaseID}`;
    const queryplainiff = await api(sqlcase_plainiff);
    const querycase_defendant = await api(sqlcase_defendant);

    const querysqlcaseExpenses = await api(sqlcaseExpenses);

    const sqltimeine = `SELECT
    ct.*,
    ts.timeline_status_name,
    COALESCE(success_count, 0) AS case_todolist_sucess_0_count,
    COALESCE(failure_count, 0) AS case_todolist_sucess_1_count,
    COALESCE(success_count, 0) + COALESCE(failure_count, 0) AS total_count
  FROM
    case_timeline ct
  JOIN
    timeline_status ts ON ts.timeline_status_id = ct.case_timebar_status
  LEFT JOIN (
    SELECT
      case_timeline_id,
      COUNT(*) AS success_count
    FROM
      case_todolist
    WHERE
      case_todolist_sucess = 0
    GROUP BY
      case_timeline_id
  ) AS success_counts ON success_counts.case_timeline_id = ct.case_timeline_id
  LEFT JOIN (
    SELECT
      case_timeline_id,
      COUNT(*) AS failure_count
    FROM
      case_todolist
    WHERE
      case_todolist_sucess = 1
    GROUP BY
      case_timeline_id
  ) AS failure_counts ON failure_counts.case_timeline_id = ct.case_timeline_id
  WHERE
    ct.case_id = ${CaseID} order by ct.case_timeline_id desc ;`;
    const querysqltimeine = await api(sqltimeine);

    const getplanif = `select * from case_plainiff where  case_id=${CaseID}`;
    const getdefendant = `select * from case_defendant where case_id=${CaseID}`;
    const getcase_complainant = `select * from case_complainant where case_complainant_case_id=${CaseID}`;
    const querygetplanif = await api(getplanif);
    const querygetdefendant = await api(getdefendant);
    const querygetcase_complinant = await api(getcase_complainant);
    console.log(querycase_defendant);
    res.send({
      status: 200,
      data: query,
      caseExpenses: querysqlcaseExpenses,
      CaseNotices: querysqlcaseNotice,
      caseLawyer: querysqlCaselawyer,
      case_plainiff: queryplainiff,
      case_defendant: querycase_defendant,
      timelien: querysqltimeine,
      querygetplanif: querygetplanif,
      querygetdefendant: querygetdefendant,
      querygetcase_complinant: querygetcase_complinant,
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
exports.exportExcelCase = async (req, res) => {
  try {
    const data = req.body.data;
    const sql = `SELECT a.*, c.ClientName, 
    co.CourtName,
    ct.CaseTypeName,tls.timeline_status_name,ctl.case_timebar_incoming,
    it.insurance_type_name,
    DATE_FORMAT(ctl.case_timebar_incoming, '%Y-%m-%d 00:00:00.000Z') AS newDate
   FROM cases a
   JOIN clients c ON a.ClientID = c.ClientID
   JOIN casetypes ct ON a.CaseTypeID = ct.CaseTypeID
   JOIN courts co ON a.CourtID = co.CourtID
   JOIN caselawyer cl ON a.CaseID = cl.caselawyer_case_id
   left JOIN case_timeline ctl ON a.case_status = ctl.case_timeline_id 
   JOIN timeline_status tls ON ctl.case_timebar_status = tls.timeline_status_id
   JOIN insurance_type it on a.insurance_type = it.insurance_type_id
   INNER JOIN case_plainiff cp ON a.CaseID = cp.case_id
   WHERE 
       a.CaseID IN (${data})
   `;
    const query = await api(sql);
    console.log(query);
    const sqlcase_plainiff = `SELECT * from  case_plainiff where case_id in (${data}) `;
    const querycase_plainiff = await api(sqlcase_plainiff);

    const sqlcase_defendant = `SELECT * from  case_defendant where case_id in (${data}) `;
    const querycase_defendant = await api(sqlcase_defendant);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    const datenow = moment(new Date()).format("DD MMMM YYYY"); // วันที่ 3 มกราคม 2567
    // Merge cells from A1 to B1
    worksheet.mergeCells("A1:K1");

    worksheet.getCell("A1").alignment = { horizontal: "center" };
    worksheet.getCell("A1").font = { bold: true };

    worksheet.getCell("A1").border = {
      top: { style: "thin", color: { argb: "00000000" } }, // เส้นขอบด้านบน
      left: { style: "thin", color: { argb: "00000000" } }, // เส้นขอบด้านซ้าย
      bottom: { style: "thin", color: { argb: "00000000" } }, // เส้นขอบด้านล่าง
      right: { style: "thin", color: { argb: "00000000" } }, // เส้นขอบด้านขวา
    };
    worksheet.getColumn("A").alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getColumn("B").alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getColumn("C").alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getColumn("D").alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getColumn("E").alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getColumn("F").alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getColumn("G").alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getColumn("H").alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getColumn("I").alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getColumn("J").alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getColumn("K").alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    /* worksheet.getColumn("L").alignment = {
      horizontal: "center",
      vertical: "middle",
    }; */

    worksheet.getCell(
      "A1"
    ).value = `สรุปรายงานข้อมูลการดำเนินคดีเพื่อการตรวจสอบบัญชี ณ ${datenow}`;
    worksheet.getRow(1).height = 30; // กำหนดความสูงของเซลล์ A1 เป็น 30
    worksheet.mergeCells("A2:A3");
    const border = {
      top: { style: "thin", color: { argb: "00000000" } }, // เส้นขอบด้านบน
      left: { style: "thin", color: { argb: "00000000" } }, // เส้นขอบด้านซ้าย
      bottom: { style: "thin", color: { argb: "00000000" } }, // เส้นขอบด้านล่าง
      right: { style: "thin", color: { argb: "00000000" } }, // เส้นขอบด้านขวา
    };

    worksheet.getCell("A2").border = border; // กำหนดเส้นขอบ
    worksheet.getCell("B2").border = border; // กำหนดเส้นขอบ
    worksheet.getCell("C2").border = border; // กำหนดเส้นขอบ
    worksheet.getCell("D2").border = border; // กำหนดเส้นขอบ
    worksheet.getCell("E2").border = border; // กำหนดเส้นขอบ
    worksheet.getCell("F2").border = border; // กำหนดเส้นขอบ
    worksheet.getCell("G2").border = border; // กำหนดเส้นขอบ
    worksheet.getCell("G3").border = border; // กำหนดเส้นขอบ
    worksheet.getCell("H3").border = border; // กำหนดเส้นขอบ

    worksheet.getCell("H2").border = border; // กำหนดเส้นขอบ

    worksheet.getCell("I2").border = border; // กำหนดเส้นขอบ
    worksheet.getCell("J2").border = border; // กำหนดเส้นขอบ
    worksheet.getCell("K2").border = border; // กำหนดเส้นขอบ
    /*  worksheet.getCell("L2").border = border; // กำหนดเส้นขอบ */

    worksheet.getCell("A2").value = `No.`;

    worksheet.mergeCells("B2:B3");
    worksheet.getCell("B2").value = `TSB Ref`;

    worksheet.mergeCells("C2:C3");
    worksheet.getCell("C2").value = `Claim no.`;

    worksheet.mergeCells("D2:D3");
    worksheet.getCell("D2").value = `หมายเลขคดีดำ`;

    worksheet.mergeCells("E2:E3");
    worksheet.getCell("E2").value = `หมายเลขคดีแดง`;

    worksheet.mergeCells("F2:F3");
    worksheet.getCell("F2").value = `ศาล`;

    worksheet.mergeCells("G2:H2");
    worksheet.getCell("G2").value = `คู่ความ`;

    worksheet.mergeCells("G3");
    worksheet.getCell("G3").value = `โจทก์`;

    worksheet.mergeCells("H3");
    worksheet.getCell("H3").value = `จำเลย`;

    worksheet.getColumn("I").width = 20; // กำหนดความกว้างของคอลัมน์ I
    worksheet.mergeCells("I2:I3");
    worksheet.getCell("I2").value = `รายละเอียดของคดี`;

    worksheet.getColumn("J").width = 20; // กำหนดความกว้างของคอลัมน์ I
    worksheet.mergeCells("J2:J3");
    worksheet.getCell("J2").value = `สถานะของคดี`;

    /*     worksheet.getColumn("K").width = 20; // กำหนดความกว้างของคอลัมน์ I
    worksheet.mergeCells("K2:K3");
    worksheet.getCell("K2").value = `ค่าบริการค้างชำระ`; */

    worksheet.getColumn("K").width = 20; // กำหนดความกว้างของคอลัมน์ I
    worksheet.mergeCells("K2:K3");
    worksheet.getCell("K2").value = `ความเห็นทางกฎหมาย`;
    // กำหนดให้ข้อความอยู่ตรงกลางของแต่ละเซลล์

    query.forEach((row, index) => {
      const rowIndex = index + 4; // เริ่มเขียนข้อมูลตั้งแต่แถวที่ 5 (A5, B5, D5, E5, F5)

      worksheet.getColumn("A").width = 30; // กำหนดความกว้างของคอลัมน์ A

      worksheet.getColumn("A").alignment = {
        vertical: "top",
        horizontal: "center",
      }; // กำหนดความกว้างของคอลัมน์ A
      worksheet.getColumn("B").width = 30; // กำหนดความกว้างของคอลัมน์ B
      worksheet.getColumn("C").width = 30; // กำหนดความกว้างของคอลัมน์ C
      worksheet.getColumn("D").width = 30; // กำหนดความกว้างของคอลัมน์ D
      worksheet.getColumn("E").width = 30; // กำหนดความกว้างของคอลัมน์ E
      worksheet.getColumn("F").width = 20; // กำหนดความกว้างของคอลัมน์ F
      worksheet.getColumn("G").width = 50; // กำหนดความกว้างของคอลัมน์ F
      worksheet.getColumn("H").width = 50; // กำหนดความกว้างของคอลัมน์ F
      worksheet.getColumn("J").width = 30; // กำหนดความกว้างของคอลัมน์ F
      const border = {
        top: { style: "thin", color: { argb: "00000000" } }, // เส้นขอบด้านบน
        left: { style: "thin", color: { argb: "00000000" } }, // เส้นขอบด้านซ้าย
        bottom: { style: "thin", color: { argb: "00000000" } }, // เส้นขอบด้านล่าง
        right: { style: "thin", color: { argb: "00000000" } }, // เส้นขอบด้านขวา
      };
      worksheet.getCell(`A${rowIndex}`).border = border; // หมายเลขคดีดำ
      worksheet.getCell(`B${rowIndex}`).border = border; // หมายเลขคดีดำ
      worksheet.getCell(`C${rowIndex}`).border = border; // หมายเลขคดีดำ
      worksheet.getCell(`D${rowIndex}`).border = border; // หมายเลขคดีดำ
      worksheet.getCell(`E${rowIndex}`).border = border; // หมายเลขคดีดำ
      worksheet.getCell(`F${rowIndex}`).border = border; // หมายเลขคดีดำ
      worksheet.getCell(`G${rowIndex}`).border = border; // หมายเลขคดีดำ
      worksheet.getCell(`H${rowIndex}`).border = border; // หมายเลขคดีดำ
      worksheet.getCell(`I${rowIndex}`).border = border; // หมายเลขคดีดำ
      worksheet.getCell(`J${rowIndex}`).border = border; // หมายเลขคดีดำ
      worksheet.getCell(`K${rowIndex}`).border = border; // หมายเลขคดีดำ
      /*     worksheet.getCell(`L${rowIndex}`).border = border; // หมายเลขคดีดำ
       */
      worksheet.getCell(`A${rowIndex}`).alignment = { horizontal: "center" };
      worksheet.getCell(`B${rowIndex}`).alignment = { horizontal: "center" };
      worksheet.getCell(`C${rowIndex}`).alignment = { horizontal: "center" };
      worksheet.getCell(`D${rowIndex}`).alignment = { horizontal: "center" };
      worksheet.getCell(`E${rowIndex}`).alignment = { horizontal: "center" };
      worksheet.getCell(`F${rowIndex}`).alignment = { horizontal: "center" };
      worksheet.getCell(`A${rowIndex}`).value = index; // หมายเลขคดีดำ
      worksheet.getCell(`B${rowIndex}`).value = row.tsb_ref; // หมายเลขคดีดำ
      worksheet.getCell(`C${rowIndex}`).value = row.Customer_ref; // หมายเลขคดีแดง
      worksheet.getCell(`D${rowIndex}`).value = row.blacknum; // ยอดการเคลม
      worksheet.getCell(`E${rowIndex}`).value = row.rednum; // ประเภทคดี
      worksheet.getCell(`F${rowIndex}`).value = row.CourtName; // ประเภทคดี
      const casePlainiffData = querycase_plainiff.filter(
        (plainiff) => plainiff.case_id === row.CaseID
      );
      if (casePlainiffData.length > 0) {
        const thaiNumerals = ["๐", "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙"];
        let thaiIndex = (index + 1)
          .toString()
          .split("")
          .map((digit) => thaiNumerals[digit])
          .join("");
        const plainiffText = casePlainiffData
          .map(
            (item, i) =>
              `${item.case_plainiff_firstname} ที่ ${thaiNumerals[i + 1]}`
          )
          .join(" และ");
        worksheet.getCell(`G${rowIndex}`).value = plainiffText;

        // เว้นบรรทัด
        worksheet.getCell(`G${rowIndex + 1}`).value = "\n";
        worksheet.getRow(rowIndex).height = 42;

        // Insert a blank line by adding an empty row
        worksheet.addRow([]);

        // Update the rowIndex to reflect the added row
      } else {
        worksheet.getCell(`G${rowIndex}`).value = ""; // หรือสามารถใส่ข้อความว่างได้
      }
      const caseDefentdant = querycase_defendant.filter(
        (plainiff) => plainiff.case_id === row.CaseID
      );
      if (caseDefentdant.length > 0) {
        const thaiNumerals = ["๐", "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙"];
        let thaiIndex = (index + 1)
          .toString()
          .split("")
          .map((digit) => thaiNumerals[digit])
          .join("");
        const plainiffText = caseDefentdant
          .map(
            (item, i) =>
              `${item.case_defendant_firstname} ที่ ${thaiNumerals[i + 1]}`
          )
          .join(" และ \n");
        worksheet.getCell(`H${rowIndex}`).value = plainiffText;
        worksheet.getCell(`H${rowIndex + 1}`).value = "\n";

        worksheet.getRow(rowIndex).height = 42;

        // Insert a blank line by adding an empty row
        worksheet.addRow([]);
      } else {
        worksheet.getCell(`H${rowIndex}`).value = ""; // หรือสามารถใส่ข้อความว่างได้
      }
      worksheet.getColumn("I").width = 100; // กำหนดความกว้างของคอลัมน์ F
      const cell = worksheet.getCell(`I${rowIndex}`);
      cell.alignment = { wrapText: true };
      const cell2 = worksheet.getCell(`H${rowIndex}`);
      cell2.alignment = { wrapText: true };
      const cell3 = worksheet.getCell(`G${rowIndex}`);
      cell3.alignment = { wrapText: true };
      worksheet.getCell(`I${rowIndex}`).value = row.case_remark; // ประเภทคดี
      worksheet.getRow(rowIndex).height = 300;
      worksheet.getCell(`I${rowIndex}`).width = 300;
      let remarkcase;
      if (row.case_close == 0) {
        remarkcase = "กำลังดำเนินการทางศาล";
      } else {
        remarkcase = "ปิดคดี";
      }
      worksheet.getCell(`J${rowIndex}`).value = remarkcase; // ประเภทคดี
      worksheet.getCell(`J${rowIndex}`).width = 200;
      /*   worksheet.getCell(`K${rowIndex}`).value = row.claimAmount; // ประเภทคดี */
      worksheet.getCell(`K${rowIndex}`).width = 200;
      worksheet.getCell(`K${rowIndex}`).value = row.case_close_detail; // ประเภทคดี
    });
    const filePath = "outpu2t.xlsx";
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
    console.log(error.message);
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
