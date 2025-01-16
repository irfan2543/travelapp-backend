const express = require("express");
const cors = require("cors");

global.app = express();
global.cron = require("node-cron")

global.knex = require("knex")({
  client: "mysql",
  connection: {
    host: "mysql.bacod.id",
    port: 3306,
    user: "kelompok3",
    password: "33445566",
    database: "travel",
  },
});

app.use(cors());
app.use(express.json());


// Controller
require("./module/schedule");
require("./module/cities");
require("./module/register");
require("./module/login");
require("./module/flights");
require("./module/Ticket");
require("./module/user");
require("./module/seat");

app.listen(3002)