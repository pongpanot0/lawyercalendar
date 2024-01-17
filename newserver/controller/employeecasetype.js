const api = require("../sql");
exports.createemployeecasetype = async (req, res) => {
  try {
    const employeescasetype_name = req.body.data;

    const sql = `insert into employeescasetype (employeescasetype_name) values ('${employeescasetype_name}')`;
    const query = await api(sql);
    res.send({ status: 200, data: query });
  } catch (error) {
    res.send({ status: 400, data: error.message });
  }
};
exports.getemployeecasetype = async (req, res) => {
  try {
    const sql = `select * from employeescasetype`;
    const query = await api(sql);
    res.send({ status: 200, data: query });
  } catch (error) {
    res.send({ status: 400, data: error.message });
  }
};
