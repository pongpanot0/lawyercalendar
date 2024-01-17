const api = require("../sql");
exports.createCustomertype = async (req, res) => {
  try {
    const customertypes_name = req.body.data;

    const sql = `insert into customertypes (customertypes_name) values ('${customertypes_name}')`;
    const query = await api(sql);
    res.send({
      status: 200,
      data: query,
    });
  } catch (error) {
    res.send({
      status: 400,
      data: error,
    });
  }
};
exports.getCustomertype = async (req, res) => {
  try {
    const sql = `select * from customertypes`;
    const query = await api(sql);
    res.send({
      status: 200,
      data: query,
    });
  } catch (error) {
    res.send({
      status: 400,
      data: error,
    });
  }
};
