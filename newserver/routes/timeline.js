const timeline = require("../controller/timeline");

module.exports = function (app) {
  app.post(`/timelinetype/create`, timeline.creteTimeLinetype);
  app.get(`/timelinetype/get`, timeline.getTimeLinetype);
  app.post(`/casetimeline/create`, timeline.createcaseTimeline);
  app.post(`/casetimeline/get`, timeline.getcaseTimeline);
  
};

