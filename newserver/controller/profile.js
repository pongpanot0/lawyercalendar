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
exports.getProfile = async (req, res) => {
    try {
        const header = req.headers;
        const user = jwtVerify(header)
        const sql = `select * from employees where employee_id=${user}`
        const query = await api(sql)
        res.send({
            status:200,
            data:query
        })
    } catch (error) {
        console.log(error.message);
    }
}