const api = require("../sql");
exports.createEmployees = async (req, res) => {
  try {
    const {
      employee_firstname,
      employee_lastname,
      employee_role,
      employee_phone,
      employee_email,
      employee_cardno,
    } = req.body.data;
    const sql = `insert into employees (employee_firstname,employee_lastname,employee_role,employee_phone,employee_email,employee_cardno) values ('${employee_firstname}','${employee_lastname}','${employee_role}','${employee_phone}'  ,'${employee_email}','${employee_cardno}')`;
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
exports.getEmployees = async (req, res) => {
  try {
    const sql = `select * from employees`;
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
