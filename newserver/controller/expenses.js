const api = require("../sql");
exports.createxpenses = async (req, res) => {
  try {
    const {
      CaseID,
      Payer,
      PaymentDate,
      expensesType,
      expenses_ref,
      expenses,
    } = req.body.data;

    const PaymentStatus = 1;

    const sql = `insert into caseexpenses ( CaseID,
      PaymentStatus,
      Payer,
      PaymentDate,
      expensesType,
      expenses_ref,
      expenses) values ( '${CaseID}',
        '${PaymentStatus}',
        '${Payer}',
        '${PaymentDate}',
        '${expensesType}',
        '${expenses_ref}',
        '${expenses}')`;
    const query = await api(sql);
    res.send({ status: 200, data: query });
  } catch (error) {
    res.send({ status: 400, data: error.message });
  }
};

exports.getexpenses = async (req, res) => {
  try {
    const sql = `select ce.*,et.expensesType_name,e.employee_firstname,e.employee_lastname  
    from caseexpenses ce 
    join employees e on (e.employee_id = ce.Payer)
    join expensestype et on (ce.expensesType = et.expensesType_id)
    
    `;

    const query = await api(sql);
    res.send({ status: 200, data: query });
  } catch (error) {
    res.send({ status: 400, data: error.message });
  }
};
