const express = require("express");
const { ManageUpload } = require("../utils/utils");
const FoodService = require("../services/foodService");

const foodService = new FoodService();

const foodRouter = express.Router();

foodRouter.post("/add", async (req, res, next) => {
  const { name, description, price, image, category } = req.body;
  try {
    const { data } = await foodService.addNewFood({
      name,
      description,
      price,
      image,
      category,
    });
    return res.json(data);
    return res.json({ success: true, message: "Food Added" });
  } catch (err) {
    console.log(data);
    next(err);
  }
});

module.exports = foodRouter;
