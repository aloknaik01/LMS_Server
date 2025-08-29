require("dotenv").config();
const app = require("./src/app");
const conf = require("./src/config/config");

app.listen(conf.port, () => {
  console.log(conf.port);
  console.log(`server is now running on port ${conf.port}`);
});
