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
    const insertId = query.insertId;
    const updatecase = `update cases set case_status='${insertId}' where CaseID=${case_id}`;
    const queryupdatecase = await api(updatecase);
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
    const sql = `SELECT
    ct.*,
    ts.timeline_status_name,
    COALESCE(success_count, 0) AS case_todolist_sucess_0_count,
    COALESCE(failure_count, 0) AS case_todolist_sucess_1_count,
    COALESCE(success_count, 0) + COALESCE(failure_count, 0) AS total_count
  FROM
    case_timeline ct
  JOIN
    timeline_status ts ON ts.timeline_status_id = ct.case_timebar_status
  LEFT JOIN (
    SELECT
      case_timeline_id,
      COUNT(*) AS success_count
    FROM
      case_todolist
    WHERE
      case_todolist_sucess = 0
    GROUP BY
      case_timeline_id
  ) AS success_counts ON success_counts.case_timeline_id = ct.case_timeline_id
  LEFT JOIN (
    SELECT
      case_timeline_id,
      COUNT(*) AS failure_count
    FROM
      case_todolist
    WHERE
      case_todolist_sucess = 1
    GROUP BY
      case_timeline_id
  ) AS failure_counts ON failure_counts.case_timeline_id = ct.case_timeline_id
  WHERE
    ct.case_id = ${case_id} order by ct.case_timeline_id desc;`;
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
