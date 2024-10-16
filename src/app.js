const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");
const { READCOMMITTED } = require("sequelize/lib/table-hints");
const router = require("../routes/routes");

app.use(express.json());
app.use(express.urlencoded());
app.use("/restaurants", router);

module.exports = app;