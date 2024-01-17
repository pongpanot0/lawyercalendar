const api = require("../sql");
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
exports.getCase = async (req, res) => {
  try {
    const sql = `select a.*,c.ClientName,ct.CaseTypeName  
    from cases a 
    join clients c on(a.ClientID = c.ClientID) 
    join casetypes ct on (a.CaseTypeID = ct.CaseTypeID)
    join courts co on (a.CourtID = co.CourtID) `;
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

exports.getCaseByid = async (req, res) => {
  try {
    const CaseID = req.body.data;
    const sql = `SELECT
    a.*,
    c.ClientName,
    ct.CaseTypeName
  FROM
    cases a
  LEFT JOIN clients c ON (a.ClientID = c.ClientID)
  LEFT JOIN casetypes ct ON (a.CaseTypeID = ct.CaseTypeID)
  JOIN courts co ON (a.CourtID = co.CourtID)
  WHERE
    a.CaseID = ${CaseID} `;
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
    where cn.CaseNotice_case_id=${CaseID}
    `;
    const querysqlcaseNotice = await api(sqlcaseNotice);

    const sqlcaseExpenses = `select cx.*,
    cxt.expensesType_name as expensesType_name,
    CONCAT(eplcx.employee_firstname, ' ', eplcx.employee_lastname) as name  
    from caseexpenses  cx 
    LEFT JOIN employees eplcx ON (cx.Payer = eplcx.employee_id)
    LEFT JOIN expensestype cxt ON (cx.expensesType = cxt.expensesType_id)
    where cx.CaseID=${CaseID}
    `;
    const querysqlcaseExpenses = await api(sqlcaseExpenses);
  
    res.send({
      status: 200,
      data: query,
      caseExpenses: querysqlcaseExpenses,
      CaseNotices: querysqlcaseNotice,
      caseLawyer: querysqlCaselawyer,
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
