const api = require("../sql");
exports.createCaseType = async (req, res) => {
  try {
    const CaseTypeName = req.body.data;
    
    const sql = `insert into casetypes (CaseTypeName) values ('${CaseTypeName}')`;
    const query = await api(sql);
    res.send({
      status: 200,
      data: query,
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
exports.getCaseType = async (req, res) => {
  try {
      
    const sql = `select * from casetypes`;
    const query = await api(sql);
    res.send({
      status: 200,
      data: query,
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
