const express = require("express");
const cors = require("cors");
const food = require("./api/food");
const user = require("./api/user");
const cart = require("./api/cart");
const order = require("./api/order");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const HandleErrors = require("./utils/error-handler");

module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use("/images", express.static("uploads"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  food(app);
  user(app);
  cart(app);
  order(app);

  app.use(HandleErrors);
};
