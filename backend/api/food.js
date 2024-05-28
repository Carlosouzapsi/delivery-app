const { ManageUpload } = require("../utils/utils");
const express = require("express");
const FoodService = require("../services/foodService");

module.exports = (app) => {
  const foodService = new FoodService();
  app.post("/food/add", async (req, res, next) => {
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
};
