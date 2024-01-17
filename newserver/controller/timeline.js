const api = require("../sql");
exports.creteTimeLinetype = async (req, res) => {
  try {
    const timeline_status_name = req.body.data;
    const sql = `insert into timeline_status (timeline_status_name) values  (${timeline_status_name})`;
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
exports.getTimeLinetype = async (req, res) => {
  try {
    const sql = `select * from  timeline_status`;
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
exports.createcaseTimeline = async (req, res) => {
  try {
    const {
      case_timeline_detail,
      case_timebar_incoming,
      case_timebar_status,
      case_id,
    } = req.body.data;
    const update = `update case_timeline set case_timeline_end=1 where case_id=${case_id}`;
    const queryupdate = await api(update);
    const sql = `insert into case_timeline (case_timeline_detail,case_timebar_incoming,case_timebar_status,case_id)
      values ('${case_timeline_detail}','${case_timebar_incoming}','${case_timebar_status}','${case_id}')
      `;
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
exports.getcaseTimeline = async (req, res) => {
  try {
    const case_id = req.body.data;
    const sql = `select ct.*,ts.timeline_status_name 
        from case_timeline ct 
        join timeline_status ts on (ts.timeline_status_id = ct.case_timebar_status )
        where case_id=${case_id}`;
    const query = await api(sql);
    res.send({
      status: 400,
      data: query,
    });
  } catch (error) {
    res.send({
      status: 400,
      data: error.message,
    });
  }
};
