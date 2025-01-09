const express = require("express");
const cors = require("cors");
global.app = express();

global.knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "travelapp",
  },
});

app.use(cors());
app.use(express.json());

// Controller
require("./module/schedule");
require("./module/cities");


app.listen(3002);

