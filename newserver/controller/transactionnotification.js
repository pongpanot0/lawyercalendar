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
exports.getTransaction = async (req, res) => {
  try {
    const user = jwtVerify(req.headers)
    const get = `select tn.*,c.tsb_ref as message from
     transaction_notification tn 
     left join cases c on c.CaseID = tn.transaction_notification_caseid
     where tn.transaction_notification_userid=${user}`
    const query = await api(get)
    res.send({
        status:200,
        data:query
    })
  } catch (error) {
    res.send({
        status:400,
        data:error.message
    })
  }
};
