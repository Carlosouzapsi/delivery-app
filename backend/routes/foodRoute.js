const express = require("express");
const multer = require("multer");

const foodRouter = express.Router();

foodRouter.post("/add");

module.exports = foodRouter;
