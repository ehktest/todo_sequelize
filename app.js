"use strict";

require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const { logger } = require("./app/controllers/logEvents");
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

// sequelize
const { sequelize } = require("./app/models/todoModel");

// logger
app.use(logger);

// body parsing
// Accept json
app.use(express.json());
// Accept text
app.use(express.text());
// Accept form
app.use(express.urlencoded({ extended: true }));

// IIFE Server
(async () => {
  // database connection test
  await sequelize
    .authenticate()
    .then(() => {
      console.log(" * DB Connected *");
    })
    .catch((err) => {
      console.error(err?.message);
      console.log("* DB Not Connected *");
    });

  // synchronization:
  await sequelize.sync({ alter: true });

  // todo routers
  app.use("/todo", require("./app/routes/todoRouter"));

  // not found catcher
  app.all("*", (req, res) => {
    res.status(404).send(`${req.method} ${req.path} not found`);
  });

  // error handler middleware via imported controller
  app.use(require("./app/controllers/errorHandler"));

  // request listener
  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
})();
