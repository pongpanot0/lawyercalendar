const api = require("../sql");
exports.createnotice = async (req, res) => {
  try {
    const dataforloop = req.body.data;
    const getLastData = `SELECT tsb_ref FROM casedocuments where DocumentID=${dataforloop[0]?.DocumentID}`;
    const querylastData = await api(getLastData);
    let lastRefNumber = querylastData[0]?.tsb_ref;
    for (let index = 0; index < dataforloop.length; index++) {
      const element = dataforloop[index];

      // Create the new reference with a leading 'R' and padding zeros
      const newRef = "R" + lastRefNumber.toString().padStart(3, "0");

      const sql = `insert into casenotice 
      (CaseNotice_case_id,
      CaseNotice_lawyer_id,
      CaseNotice_amount,
      CaseNotice_to,
      CaseNotice_ref,
      CaseNotice_senddate) 
      values 
      ('${parseInt(element.DocumentID)}',
      '${element.Payer}',
      '${element.expenses}',
      '${element.CaseNotice_to}',
      '${lastRefNumber}',
      '${element.PaymentDate}') 
      `;
      const query = await api(sql);
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
    join casedocuments c on (c.DocumentID = cn.CaseNotice_case_id)
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
    const sql = `select cn.*,c.Customer_ref,e.employee_firstname,e.employee_lastname 
    from casenotice cn
    join casedocuments c on (c.DocumentID = cn.CaseNotice_case_id)
    join employees e on (cn.CaseNotice_lawyer_id = e.employee_id)
    where tsb_ref = '${data}'
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
