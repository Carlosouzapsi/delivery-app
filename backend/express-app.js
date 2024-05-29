const express = require("express");
const cors = require("cors");
const food = require("./api/food");

module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use("/images", express.static("uploads"));

  food(app);
};