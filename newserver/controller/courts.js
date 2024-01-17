const api = require("../sql");
exports.getcourts = async (req, res) => {
  try {
    const sql = `select * from courts`;
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
