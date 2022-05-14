const bodyParser = require("body-parser");
const cors = require("cors");
const { hackathons, jobs, internships, scripts } = require("../routes");

module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/api/jobs", jobs);
  app.use("/api/hackathons", hackathons);
  app.use("/api/internships", internships);
  app.use("/api/scripts", scripts);
};
