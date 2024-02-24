const { sendLineMessage } = require("../shared/sendline");
const { sendMobileNotify } = require("../shared/sendMobile");
const api = require("../sql");
const jwt = require("jsonwebtoken");
function jwtVerify(params) {
  try {
    const token = jwt.decode(params.token);
    return token.employee_id;
  } catch (error) {
    return "Something Wrong";
  }
}
exports.createxpenses = async (req, res) => {
  try {
    const {
      Payer,
      PaymentDate,
      expensesType,
      expenses_ref,
      expenses,
      paid_type,
    } = req.body.data;
    const PaymentStatus = 1;
    let Pay;
    const users = jwtVerify(req.headers);
    if (Payer === undefined) {
      Pay = users;
    } else {
      Pay = Payer;
    }

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
        '${Pay}',
        '${PaymentDate}',
        '${expensesType}',
        '${expenses_ref}',
        '${expenses}')`;
    const query = await api(sql);

    const text = "มีการเพิ่มค่าใช้จ่ายใหม่ของคุณ";
    const accessToken = `select employee_linetoken,employee_mobiletoken from employees where employee_id='${Pay}'`;
    const queryaccesstoken = await api(accessToken);
    const insertTransaction = `insert into transaction_notification 
    (transaction_notification_isexpenses,transaction_notification_userid) values (1,'${Pay}')`;
    const querytransaction = await api(insertTransaction);
    if (queryaccesstoken.length > 0) {
      const token = queryaccesstoken[0]?.employee_linetoken;
      const mobiletoken = queryaccesstoken[0]?.employee_mobiletoken;
      await sendLineMessage(text, token);
      await sendMobileNotify(mobiletoken, "LawyerApp", text);
    }
    res.send({ status: 200, data: query });
  } catch (error) {
    console.log(error.message);
    res.send({ status: 400, data: error.message });
  }
};

exports.getexpenses = async (req, res) => {
  try {
    const data = req.body.data;
    let casewhen;
    if (data !== 'mobile') {
      casewhen = "ORDER BY ce.ExpenseID DESC";
    } else if (data == "mobile") {
      const users = jwtVerify(req.headers);
      casewhen = `where ce.Payer = ${users} ORDER BY ce.ExpenseID DESC`;
    }
    const sql = `select ce.*,et.expensesType_name,e.employee_firstname,e.employee_lastname
    from caseexpenses ce 
    left join employees e on (e.employee_id = ce.Payer)
    left join expensestype et on (ce.expensesType = et.expensesType_id)
    ${casewhen}
    `;

    const query = await api(sql);

    res.send({ status: 200, data: query });
  } catch (error) {
    res.send({ status: 400, data: error.message });
  }
};
