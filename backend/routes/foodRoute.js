const express = require("express");
const { ManageUpload } = require("utils");

const foodRouter = express.Router();

foodRouter.post("/add", ManageUpload.single("image"));

module.exports = foodRouter;
