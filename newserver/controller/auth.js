const api = require("../sql");
const bcrypt = require("bcrypt");
exports.creteUsers = async (req, res) => {
  try {
    const { employee_username, employee_password, employee_id } = req.body;

    const saltRounds = 10;

    bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        console.log("Salt: ", salt);
        return bcrypt.hash(employee_password, salt);
      })
      .then(async (hash) => {
        const sql = `update employees set employee_username='${employee_username}',employee_password='${hash}' where employee_id='${employee_id}'`;
        const query = await api(sql);
        res.send({
          status: 200,
          data: query,
        });
      });
  } catch (error) {
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const sql = `update employees set employee_username='${employee_username}',employee_password='${employee_password}' where employee_id='${employee_id}'`;
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
