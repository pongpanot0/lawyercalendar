const { sendLineMessage } = require("../shared/sendline");
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
      paid_type,
    } = req.body.data;
    const PaymentStatus = 1;

    const sql = `insert into caseexpenses (
      paid_type,
      PaymentStatus,
      Payer,
      PaymentDate,
      expensesType,
      expenses_ref,
      expenses) values ( 
        '${paid_type}',
        '${PaymentStatus}',
        '${Payer}',
        '${PaymentDate}',
        '${expensesType}',
        '${expenses_ref}',
        '${expenses}')`;
    const query = await api(sql);

    const accessToken = `select employee_linetoken from employees where employee_id='${Payer}'`;
    const text = 'มีการเพิ่มค่าใช้จ่ายใหม่ของคุณ'
    const queryaccesstoken = await api(accessToken)
    if (queryaccesstoken.length > 0) {
      const token = queryaccesstoken[0]?.employee_linetoken;
      sendLineMessage(text, token);
    }
    res.send({ status: 200, data: query });
  } catch (error) {
    res.send({ status: 400, data: error.message });
  }
};

exports.getexpenses = async (req, res) => {
  try {
    const data = req.body.data;
    
  console.log(data);
    let casewhen;
    if (data == undefined) {
      casewhen = "ORDER BY CONVERT(ce.PaymentDate, DATE) DESC";
    } else {
      casewhen = `where STR_TO_DATE(PaymentDate, '%Y-%m-%dT%H:%i:%s.000Z') 
      BETWEEN '${data.startDate}' AND '${data.endDate}' ORDER BY CONVERT(ce.PaymentDate, DATE) DESC`;
    }
    const sql = `select ce.*,et.expensesType_name,e.employee_firstname,e.employee_lastname
    from caseexpenses ce 
    left join employees e on (e.employee_id = ce.Payer)
    left join expensestype et on (ce.expensesType = et.expensesType_id)
    ${casewhen}
    `;
    console.log(casewhen);
    const query = await api(sql);
    console.log(query);
    res.send({ status: 200, data: query });
  } catch (error) {
    res.send({ status: 400, data: error.message });
  }
};
