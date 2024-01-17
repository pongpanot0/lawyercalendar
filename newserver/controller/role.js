const api = require("../sql");
exports.getRole = async (req, res) => {
  try {
    const sql = `select * from role`;
    const query = await api(sql);
    res.send({ status: 200, data: query });
  } catch (error) {
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
