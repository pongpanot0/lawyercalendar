const api = require("../sql");
exports.createTask = async (req, res) => {
  try {
    const { case_todolist_name, case_timeline_id, case_id } = req.body.data;
    
    const sql = `insert into case_todolist (case_todolist_name,case_timeline_id,case_id) values ('${case_todolist_name}','${case_timeline_id}','${case_id}')`;
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
    console.log(error.message);
  }
};
exports.getTask = async (req, res) => {
    try {
      const   case_timeline_id  = req.body.data;
   
      const sql = `select * from case_todolist where case_timeline_id ='${case_timeline_id}'`;
      const query = await api(sql);
      console.log(query);
      res.send({
        status: 200,
        data: query,
      });
    } catch (error) {
      res.send({
        status: 400,
        data: error.message,
      });
      console.log(error.message);
    }
  };
  exports.upDateTask = async (req, res) => {
    try {
        const {case_todolist_sucess,case_todolist } = req.body.data
        const sql = `update case_todolist set case_todolist_sucess=${case_todolist_sucess} where case_todolist=${case_todolist}`
        const query = await api(sql)
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
  }