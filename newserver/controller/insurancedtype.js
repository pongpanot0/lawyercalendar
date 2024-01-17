const api = require("../sql");
exports.createinsurance_type = async (req, res) => {
  try {
    const expensesType_name = req.body.data;
    console.log(req.body.data);
    const sql = `insert into insurance_type (insurance_type_name) values ('${expensesType_name}')`;
    const query = await api(sql);
    res.send({ status: 200, data: query });
  } catch (error) {
    res.send({ status: 400, data: error.message });
  }
};

exports.getinsurance_type = async (req, res) => {
  try {
    const sql = `select * from insurance_type`;
    const query = await api(sql);
    res.send({ status: 200, data: query });
  } catch (error) {
    res.send({ status: 400, data: error.message });
  }
};
