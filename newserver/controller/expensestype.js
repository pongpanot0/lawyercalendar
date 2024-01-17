const api = require("../sql");
exports.createexpenses = async (req, res) => {
  try {
    const expensesType_name = req.body.data;

    const sql = `insert into expensestype (expensesType_name) values ('${expensesType_name}')`;
    const query = await api(sql);
    res.send({ status: 200, data: query });
  } catch (error) {
    res.send({ status: 400, data: error.message });
  }
};

exports.getexpenses = async (req, res) => {
  try {
    const sql = `select * from expensestype`;
    const query = await api(sql);
    res.send({ status: 200, data: query });
  } catch (error) {
    res.send({ status: 400, data: error.message });
  }
};
