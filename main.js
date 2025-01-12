const express = require("express");
const cors = require("cors");
global.app = express();

global.knex = require("knex")({
  client: "mysql",
  connection: {
    host: "mysql.bacod.id",
    port: 443,
    user: "kelompok3",
    password: "33445566",
    database: "travelapp",
  },
});

app.use(cors());
app.use(express.json());

// Controller
require("./module/schedule");
require("./module/cities");
require("./module/register");
require("./module/login");

app.listen(3002)