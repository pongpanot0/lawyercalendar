const api = require("../sql");
exports.createemployeejob = async (req, res) => {
  try {
    const employeesjob_name = req.body.data;

    const sql = `insert into employeesjob (employeesjob_name) values ('${employeesjob_name}')`;
    const query = await api(sql);
    res.send({ status: 200, data: query });
  } catch (error) {
    res.send({ status: 400, data: error.message });
  }
};


