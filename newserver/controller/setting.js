const api = require("../sql");
exports.createsetting = async (req, res) => {
  try {
    const {
      settingsusers_primarybutton,
      settingsusers_cancelbutton,
      settingsusers_fontsize,
      settingsusers_fontcolor,
      settingsusers_primarycolor,
      settingsusers_user_id,
      settingsusers_fontButtonColor,
      settingsusers_backgroundcolor,
    } = req.body.data;
   
    const sql = `update settingsusers set settingsusers_fontButtonColor='${settingsusers_fontButtonColor}',settingsusers_backgroundcolor='${settingsusers_backgroundcolor}',
    settingsusers_primarybutton='${settingsusers_primarybutton}',settingsusers_cancelbutton='${settingsusers_cancelbutton}',settingsusers_fontsize='${settingsusers_fontsize}',
    settingsusers_fontcolor='${settingsusers_fontcolor}',settingsusers_primarycolor='${settingsusers_primarycolor}' where settingsusers_user_id=${settingsusers_user_id}`;
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
exports.getsetting = async (req, res) => {
  try {
    const user_id = req.body.data;
   
    const sql = `select * from settingsusers where settingsusers_user_id=${user_id}`;
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
