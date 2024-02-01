const notice = require("../controller/notice");

module.exports = function (app) {
  app.post(`/notice/create`, notice.createnotice);
  app.post(`/noticewait/create`, notice.createwaitNotice);
  
  app.get(`/notice/get`, notice.getnotice);
  app.post(`/noticeBydocID/get`, notice.getnoticeBydocID);

};

