const FoodModel = require("../models/foodModel");

class FoodRepository {
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
}

module.exports = FoodRepository;
