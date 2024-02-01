const api = require("../sql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.creteUsers = async (req, res) => {
  try {
    const { employee_username, employee_password, employee_id } = req.body;

    const saltRounds = 10; // Number of salt rounds to use during hashing
    const hash = await bcrypt.hash(employee_password, saltRounds);

    const sql = `update employees set employee_username='${employee_username}',employee_password='${hash}' where employee_id='${employee_id}'`;
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
exports.login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const sql = `select count(*) as count from  employees where employee_username='${username}'`;
    const query = await api(sql);
    if (query[0]?.count > 0) {
      const sql2 = `select *  from  employees where employee_username='${username}'`;
      const query2 = await api(sql2);
      const enhash = await bcrypt.compare(
        password,
        query2[0]?.employee_password
      );
      jwt.sign(
        {
          employee_id: query2[0]?.employee_id,
          employee_role: query2[0]?.employee_role,
          employee_firstname: query2[0]?.employee_firstname,
          employee_cardno: query2[0]?.employee_cardno,
          employee_lastname: query2[0]?.employee_lastname,
          employee_phone: query2[0]?.employee_phone,
          employee_email: query2[0]?.employee_email,
          employee_username: query2[0]?.employee_username,
          employee_password: query2[0]?.employee_password,
          employee_linetoken: query2[0]?.employee_linetoken,
        },
        "1234",
        { expiresIn: 60 * 60 },
        (err, token) => {
          if (err) {
            console.error("Error signing JWT:", err);
            res
              .status(500)
              .send({ status: 500, message: "Internal Server Error" });
          } else {
            if (enhash === true) {
              res.send({
                status: 200,
                token: token,
              });
            } else {
              // Handle the case where enhash is not true
              res.status(400).send({ status: 400, message: "Invalid request" });
            }
          }
        }
      );
    }
  } catch (error) {
    
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
exports.loginMobile = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const mobiletoken = req.body.employee_mobiletoken;

    const sql = `select count(*) as count from  employees where employee_username='${username}'`;
    const query = await api(sql);
    if (query[0]?.count > 0) {
      const sql2 = `select *  from  employees where employee_username='${username}'`;
      const query2 = await api(sql2);
      const updateusertoken  = `update employees set employee_mobiletoken='${mobiletoken}' where employee_id=${query2[0]?.employee_id}`
      const queryupdateusertoken = await api(updateusertoken)
      const enhash = await bcrypt.compare(
        password,
        query2[0]?.employee_password
      );
      jwt.sign(
        {
          employee_id: query2[0]?.employee_id,
          employee_role: query2[0]?.employee_role,
          employee_firstname: query2[0]?.employee_firstname,
          employee_cardno: query2[0]?.employee_cardno,
          employee_lastname: query2[0]?.employee_lastname,
          employee_phone: query2[0]?.employee_phone,
          employee_email: query2[0]?.employee_email,
          employee_username: query2[0]?.employee_username,
          employee_password: query2[0]?.employee_password,
          employee_linetoken: query2[0]?.employee_linetoken,
        },
        "1234",
        { expiresIn: 60 * 60 },
        (err, token) => {
          if (err) {
            console.error("Error signing JWT:", err);
            res
              .status(500)
              .send({ status: 500, message: "Internal Server Error" });
          } else {
            if (enhash === true) {
              res.send({
                status: 200,
                token: token,
              });
            } else {
              // Handle the case where enhash is not true
              res.status(400).send({ status: 400, message: "Invalid request" });
            }
          }
        }
      );
    }
  } catch (error) {
    console.log(error.message);
    res.send({
      status: 400,
      data: error.message,
    });
  }
};