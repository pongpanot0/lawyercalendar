const api = require("../sql");

exports.createwaitNotice = async (req, res) => {
  try {
    const data = req.body.data;
    const updateStatus = `update casedocuments set case_documentstatus = 1  where tsb_ref='${data}'`;
    const queryupdateStatus = await api(updateStatus);
    console.log(data);
    res.send({
      status: 200,
      data: queryupdateStatus,
    });
  } catch (error) {
    res.send({
      status: 400,
      data: error.message,
    });
  }
};

exports.createnotice = async (req, res) => {
  try {
    const dataforloop = req.body.data;

    const getLastData = `SELECT tsb_ref FROM casedocuments where tsb_ref='${dataforloop[0]?.DocumentID}'`;

    const querylastData = await api(getLastData);
    let lastRefNumber = querylastData[0]?.tsb_ref;
    for (let index = 0; index < dataforloop.length; index++) {
      const element = dataforloop[index];
      let valueforiswait;
      if (element.waitnotice == false) {
        valueforiswait = 0;
        const updateStatus = `update casedocuments set case_documentstatus = 2 where tsb_ref='${dataforloop[0]?.DocumentID}'`;
        const queryupdateStatus = await api(updateStatus);
      } else {
        valueforiswait = 1;
      }

      // Create the new reference with a leading 'R' and padding zeros

      const sql = `insert into casenotice 
      (
      CaseNotice_lawyer_id,
      CaseNotice_amount,
      CaseNotice_to,
      CaseNotice_ref,
      CaseNotice_senddate
      ) 
      values 
      (
      '${element.Payer}',
      '${element.expenses}',
      '${element.CaseNotice_to}',
      '${lastRefNumber}',
      '${element.PaymentDate}'
      ) 
      `;
      const query = await api(sql);

      const updateexpenses = `insert into caseexpenses (Payer,expensesType,expenses_ref,expenses,PaymentDate) 
      values  ('${element.Payer}','${element.expensesType}','${lastRefNumber}',${element.expenses},'${element.PaymentDate}')`;
      const queryupdate = await api(updateexpenses);
    }

    res.send({ status: 200 });
  } catch (error) {
    console.log(error.message);
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
exports.getnotice = async (req, res) => {
  try {
    const sql = `select cn.*,c.Customer_ref,e.employee_firstname,e.employee_lastname 
    from casenotice cn
    join casedocuments c on (c.tsb_ref = cn.CaseNotice_ref)
    join employees e on (cn.CaseNotice_lawyer_id = e.employee_id)
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
exports.getnoticeBydocID = async (req, res) => {
  try {
    const data = req.body.data;
    const sql = `SELECT cn.*, c.Customer_ref, e.employee_firstname, e.employee_lastname
    FROM casenotice cn
    JOIN casedocuments c ON c.tsb_ref = cn.CaseNotice_ref
    JOIN employees e ON cn.CaseNotice_lawyer_id = e.employee_id
    WHERE cn.CaseNotice_ref = '${data}';
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
