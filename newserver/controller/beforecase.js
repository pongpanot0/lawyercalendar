const moment = require("moment/moment");
const api = require("../sql");
const dayjs = require("dayjs");
exports.createbeforebasetype = async (req, res) => {
  try {
    const beforecase_name = req.body.data;

    const sql = `insert into beforecase (beforecase_name) values ('${beforecase_name}')`;
    const query = await api(sql);
    res.send({
      status: 200,
      data: query,
    });
  } catch (error) {
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
exports.getbeforebasetype = async (req, res) => {
  try {
    const sql = `select * from beforecase`;
    const query = await api(sql);
    res.send({
      status: 200,
      data: query,
    });
  } catch (error) {
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
exports.createbeforecase = async (req, res) => {
  try {
    const {
      ReciveType,
      Lawyer,
      clientID,
      Customer_ref,
      DateReceived,
      claimamount,
      assured,
      timebar,
      insurance_type,
    } = req.body.data;
    /*   console.log(req.body.data); 
    const daterecivetimeThai = dayjs(DateReceived).format('YYYY-MM-DD')
      const timebartimeThai = dayjs(DateReceived).format('YYYY-MM-DD')
      console.log(daterecivetimeThai); */

    let DocumentStatus = 1;
    const getLastDataQuery = `SELECT MAX(CAST(SUBSTRING(tsb_ref, 8) AS UNSIGNED)) AS lastRefNumber FROM casedocuments`;
    const querylastData = await api(getLastDataQuery);

    let lastRefNumber = 0;
    if (querylastData.length > 0 && querylastData[0].lastRefNumber !== null) {
      lastRefNumber = querylastData[0].lastRefNumber;
    }

    const newRef = "R" + (lastRefNumber + 1).toString().padStart(3, "0");

    const sql = `insert into casedocuments (tsb_ref,clientID,LawyerID,DocumentStatus,DateReceived,Receiver,Customer_ref,claimamount,assured,timebar,insurance_type) values ('${newRef}','${clientID}','${Lawyer}','${DocumentStatus}','${DateReceived}','${ReciveType}','${Customer_ref}','${claimamount}','${assured}','${timebar}','${insurance_type}')`;
    const query = await api(sql);
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
exports.getbeforecaseDocuments = async (req, res) => {
  try {
    const sql = `select c.*,e.employee_firstname,e.employee_lastname,b.beforecase_name,ci.ClientName from casedocuments  c
    join employees e on(c.LawyerID = e.employee_id)
    join beforecase b on(c.Receiver = b.beforecase_id)
    join clients ci on (c.clientID = ci.clientID) 
    `;
    const query = await api(sql);
    res.send({
      status: 200,
      data: query,
    });
  } catch (error) {
    res.send({
      status: 400,
      data: error.message,
    });
  }
};

exports.getbeforecaseDocumentsbyID = async (req, res) => {
  try {
    const ids = req.body.data;
    const sql = `select it.insurance_type_name,c.*,e.employee_firstname,e.employee_lastname,b.beforecase_name,ci.ClientName from casedocuments  c
    join employees e on(c.LawyerID = e.employee_id)
    join beforecase b on(c.Receiver = b.beforecase_id)
    join clients ci on (c.clientID = ci.clientID) 
    join insurance_type it on (it.insurance_type_id = c.insurance_type)
    where DocumentID = ${ids}
    `;
    console.log({ids});
    const query = await api(sql);
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

exports.createBeforeCaseTocase = async (req, res) => {
  try {
  
    const plainiffArray = req.body.data.plainiffArray;
    const DefenantArray = req.body.data.DefenantArray;
    
    const caseData = req.body.data.caseData;
    const BeforeFromArray = req.body.data.BeforeFromArray;
    const tsb_ref = req.body.data.tsb_ref;
    const FromCase =req.body.data.FromCase
    const sqlupdate = `update casedocuments set case_documentstatus=1 where tsb_ref='${tsb_ref}'`
    const querysqlupdate = await api(sqlupdate)
    const sql = `insert into cases (
      ClientID,
      CaseTypeID,
      CourtID,
      rednum,
      blacknum,
      Customer_ref,
      case_courtType,
      plaintiff_type,
      ReciveWarrantDate,
      DuedateSummittree,
      tsb_ref,
      insurance_type,
      case_remark,
      claimAmount
    )
    values
    (
      '${caseData.clientID}',
      '${caseData.CaseType}',
      '${caseData.courtID}',
      '${BeforeFromArray.rednum}',
      '${BeforeFromArray.blacknum}',
      '${caseData.Customer_ref}',
      '1',
      '${BeforeFromArray.groupdate}',
      '${BeforeFromArray.ReciveWarrantDate}',
      '${BeforeFromArray.DuedateSummittree}',
      '${tsb_ref}',
      '${caseData.insurance_type}',
      '${BeforeFromArray.remark}',
      '${caseData.claimamount}'
    )
    `;
    const querysql = await api(sql);
    const insertId = querysql.insertId;


    plainiffArray.forEach(async (element) => {
    
      const sqlplainiff = `insert into case_plainiff (case_plainiff_firstname,case_plainiff_lastname,case_id) values (${element.firstname},"${element.lastname}","${insertId}")`;
      const querysqlplainiff = await api(sqlplainiff);
    });
    DefenantArray.forEach(async (element) => {
      const sqlDefenantArray = `insert into case_defendant (case_defendant_firstname,case_defendant_lastname,case_id) values (${element.firstname},"${element.lastname}","${insertId}")`;
      const querysqlDefenantArray = await api(sqlDefenantArray);
    });
    FromCase.forEach(async (element) => {
      const sqlFromCaseArray = `insert into caselawyer (caselawyer_case_id,caselawyer_employee_id,caselawyer_employee_type) values ("${insertId}",${element.value},"${element.age}")`;
      const querysqlFromCaseArray = await api(sqlFromCaseArray);
    });
    
    res.send({
      status: 200,
    });
  } catch (error) {
    console.log(error.message);
  }
};
