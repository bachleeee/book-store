const app = require("./app");
const config = require("./app/config");
const databaseSetvices = require("./app/utils/mongodb.util");
const port = config.app.port;

databaseSetvices.connect();
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});