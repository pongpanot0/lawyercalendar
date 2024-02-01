const moment = require("moment/moment");
const api = require("../sql");
const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
const { sendLineMessage } = require("../shared/sendline");
const secretKey = "1234"; // Replace with your actual secret key
function jwtVerify(params) {
  try {
    const token = jwt.decode(params.token);
    return token.employee_id;
  } catch (error) {
    return "Something Wrong";
  }
}
exports.updateBeforecase = async (req, res) => {
  try {
    const {
      tsb_ref,
      Receiver,
      LawyerID,
      clientID,
      Customer_ref,
      claimamount,
      assured,
      DateReceived,
      insurance_type,
      customer_reponsive,
    } = req.body.data;
    const update = `update casedocuments set 
    Receiver='${Receiver}',
    LawyerID='${LawyerID}',
    clientID='${clientID}',
    Customer_ref='${Customer_ref}',
    claimamount='${claimamount}',
    assured='${assured}',
    DateReceived='${DateReceived}',
    insurance_type='${insurance_type}',
    customer_reponsive='${customer_reponsive}'
    where tsb_ref ='${tsb_ref}'`;
    const query = await api(update);
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
exports.gettsbref = async (req, res) => {
  try {
    const sql = `SELECT MAX(CAST(SUBSTRING(tsb_ref, 4) AS UNSIGNED)) AS lastRefNumber FROM casedocuments`;

    const query = await api(sql);
    const newRef =
      "R" + (query[0]?.lastRefNumber + 1).toString().padStart(3, "0");
    res.send({
      status: 200,
      data: newRef,
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
      isplanif,
      DateReceived,
      claimamount,
      assured,
      policy_ref,
      timebar,
      insurance_type,
      customer_responses_id,
      tsb_ref,
    } = req.body.data;

    const header = req.headers;
    const jwts = jwtVerify(header);
    let DocumentStatus = 1;
    const getLastDataQuery = `SELECT MAX(CAST(SUBSTRING(tsb_ref, 4) AS UNSIGNED)) AS lastRefNumber FROM casedocuments`;
    const querylastData = await api(getLastDataQuery);

    let lastRefNumber = 0;
    if (querylastData.length > 0 && querylastData[0].lastRefNumber !== null) {
      lastRefNumber = querylastData[0].lastRefNumber;
    }

    const newRef = "R" + (lastRefNumber + 1).toString().padStart(3, "0");

    const sql = `insert into casedocuments (isplanif,policy_ref,customer_reponsive,created_by,tsb_ref,clientID,LawyerID,DocumentStatus,DateReceived,Receiver,Customer_ref,claimamount,assured,timebar,insurance_type) values ('${isplanif}','${policy_ref}','${customer_responses_id}','${jwts}','${tsb_ref}','${clientID}','${Lawyer}','${DocumentStatus}','${DateReceived}','${ReciveType}','${Customer_ref}','${claimamount}','${assured}','${timebar}','${insurance_type}')`;
    const query = await api(sql);

    const text = "มีการเพิ่มก่อนฟ้องให้คุณ";

    const accessToken = `select employee_linetoken from employees where employee_id='${Lawyer}'`;
    const queryaccesstoken = await api(accessToken);
    if (queryaccesstoken.length > 0) {
      const token = queryaccesstoken[0]?.employee_linetoken;
      sendLineMessage(text, token);
    }

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
exports.getbeforecaseDocuments = async (req, res) => {
  try {
    const header = req.headers;
    const jwts = jwtVerify(header);
    const sql = `select c.*,e.employee_firstname,e.employee_lastname,b.beforecase_name,ci.ClientName from casedocuments  c
    left join employees e on(c.LawyerID = e.employee_id)
    left join beforecase b on(c.Receiver = b.beforecase_id)
    left join clients ci on (c.clientID = ci.clientID) 
    
    `;
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
exports.updateOpenBeforecase = async (req, res) => {
  try {
    const tsb_ref = req.body.data;
    const sql2 = `update casedocuments set isclose=0   where tsb_ref='${tsb_ref}'`;
    const querysql2 = await api(sql2);
    console.log(querysql2);
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
exports.createCloseBeforecase = async (req, res) => {
  try {
    const header = req.headers;
    const jwts = jwtVerify(header);
    const { beforecase_closedetail, tsb_ref } = req.body.data;
    const sql = `update casedocuments set isclose=1,beforecase_closedetail='${beforecase_closedetail}' where tsb_ref='${tsb_ref}' `;
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
exports.getbeforecaseDocumentsbyID = async (req, res) => {
  try {
    const ids = req.body.data;
    const header = req.headers;
    const jwts = jwtVerify(header);
    const sql = `select it.insurance_type_name,c.*,e.employee_firstname,e.employee_lastname,b.beforecase_name,ci.ClientName from casedocuments  c
    join employees e on(c.LawyerID = e.employee_id)
    join beforecase b on(c.Receiver = b.beforecase_id)
    join clients ci on (c.clientID = ci.clientID) 
    join insurance_type it on (it.insurance_type_id = c.insurance_type)
    where DocumentID = ${ids}
    `;

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
    const header = req.headers;
    const jwts = jwtVerify(header);
    const plainiffArray = req.body.data.plainiffArray;
    const DefenantArray = req.body.data.DefenantArray;
    const caseData = req.body.data.caseData;
    const BeforeFromArray = req.body.data.BeforeFromArray;
    const tsb_ref = req.body.data.tsb_ref;
    const FromCase = req.body.data.FromCase;
    const ComplaintArray = req.body.data.ComplaintArray;
    const sqlupdate = `update casedocuments set case_documentstatus=3 where tsb_ref='${tsb_ref}'`;
    const querysqlupdate = await api(sqlupdate);
    const sql = `insert into cases (
      closetime,
      customer_resposive,
      ClientID,
      CaseTypeID,
      CourtID,
      rednum,
      blacknum,
      Customer_ref,
      case_courtType,
      plaintiff_type,
      ReciveWarrantDate,
      tsb_ref,
      insurance_type,
      case_remark,
      claimAmount
    )
    values
    (
      '${BeforeFromArray.closetime}',
      '${caseData.customer_reponsive}',
      '${caseData.clientID}',
      '${caseData.CaseType}',
      '${caseData.courtID}',
      '${BeforeFromArray.rednum}',
      '${BeforeFromArray.blacknum}',
      '${caseData.Customer_ref}',
      '1',
      '${BeforeFromArray.groupdate}',
      '${BeforeFromArray.ReciveWarrantDate}',
      '${tsb_ref}',
      '${caseData.insurance_type}',
      '${BeforeFromArray.remark}',
      '${caseData.claimamount}'
    )
    `;
    const querysql = await api(sql);
    const insertId = querysql.insertId;

    plainiffArray.forEach(async (element) => {
      const sqlplainiff = `insert into case_plainiff (case_plainiff_firstname,case_id) values ('${element.firstname}',"${insertId}")`;
      const querysqlplainiff = await api(sqlplainiff);
    });
    DefenantArray.forEach(async (element) => {
      const sqlDefenantArray = `insert into case_defendant (case_defendant_firstname,case_id) values ('${element.firstname}',"${insertId}")`;
      const querysqlDefenantArray = await api(sqlDefenantArray);
    });
    ComplaintArray.forEach(async (element) => {
      const sqlComplaintArrat = `insert into case_complainant (case_complainant_name,case_complainant_case_id) values ('${element.firstname}',"${insertId}")`;
      const querysqlComplaintArrat = await api(sqlComplaintArrat);
    });
    FromCase.forEach(async (element) => {
      const sqlFromCaseArray = `insert into caselawyer (caselawyer_case_id,caselawyer_employee_id,caselawyer_employee_type) values ("${insertId}",${element.value},"${element.age}")`;
      const querysqlFromCaseArray = await api(sqlFromCaseArray);
      const accessToken = `select employee_linetoken from employees where employee_id='${element.value}'`;
      const text = "มีการเพิ่มคุณเข้าไปในคดีใหม่";
      const queryaccesstoken = await api(accessToken);
      if (queryaccesstoken.length > 0) {
        const token = queryaccesstoken[0]?.employee_linetoken;
        sendLineMessage(text, token);
      }
    });
    if (BeforeFromArray.groupdate == 1) {
      const sqltimeline = `insert into case_timeline (case_timeline_detail,case_timebar_incoming,case_timebar_status,case_id)
      values ('นัดครั้งที่ 1','${BeforeFromArray.firstmeet}','4','${insertId}')
      `;

      const querysqltimeline = await api(sqltimeline);
      const insertIdtimeline = querysqltimeline.insertId;
      const updatecase = `update cases set case_status='${insertIdtimeline}' where CaseID=${insertId}`;
      const queryupdatecase = await api(updatecase);
    }
    if (BeforeFromArray.groupdate == 2) {
      const sqltimeline = `insert into case_timeline (case_timeline_detail,case_timebar_incoming,case_timebar_status,case_id)
      values ('เริ่มดำเนินการ','${BeforeFromArray.ReciveWarrantDate}','3','${insertId}')
      `;

      const querysqltimeline = await api(sqltimeline);
      const insertIdtimeline = querysqltimeline.insertId;
      const updatecase = `update cases set case_status='${insertIdtimeline}' where CaseID=${insertId}`;
      const queryupdatecase = await api(updatecase);
    }

    res.send({
      status: 200,
    });
  } catch (error) {
    console.log(error.message);
  }
};
