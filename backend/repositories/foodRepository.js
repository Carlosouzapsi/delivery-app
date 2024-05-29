const FoodModel = require("../models/foodModel");
const fs = require("fs");

class FoodRepository {
  // create new food
  async AddFood({ name, description, price, image, category }) {
    try {
      const food = new FoodModel({
        name,
        description,
        price,
        image,
        category,
      });
      const foodResult = await food.save();
      return foodResult;
    } catch (err) {
      throw new Error("Unable to create a new food");
    }
  }
  // all food list
  async ListFoods() {
    try {
      const foods = await FoodModel.find({});
      return foods;
    } catch (err) {
      throw new Error("unable to list foods");
    }
  }

  // remove food item
  async RemoveFood(id) {
    try {
      const food = await FoodModel.findById(id);
      fs.unlink(`uploads/${food.image}`, () => {});
      await FoodModel.findByIdAndDelete(food._id);
      return food;
    } catch (error) {
      throw new Error("unable to remove food");
    }
  }
}

module.exports = FoodRepository;
