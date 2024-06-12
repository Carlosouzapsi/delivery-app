const express = require("express");
const cors = require("cors");
const food = require("./api/food");
const user = require("./api/user");
const appEvents = require("./api/app-events");
const HandleErrors = require("./utils/error-handler");

module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use("/images", express.static("uploads"));

  food(app);
  user(app);

  app.use(HandleErrors);
  app.use(appEvents);
};
