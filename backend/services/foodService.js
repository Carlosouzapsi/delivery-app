const FoodRepository = require("../repositories/foodRepository");
const { ManageUpload, FormateData } = require("../utils/utils");
const { APIError } = require("../utils/app-errors");

class FoodService {
  constructor() {
    this.repository = new FoodRepository();
  }

  async addNewFood(foodInputs) {
    try {
      const foodResult = await this.repository.AddFood(foodInputs);
      return FormateData(foodResult);
    } catch (err) {
      throw new APIError(err);
    }
  }

  async listAllFoods() {
    try {
      const foodsListResult = await this.repository.ListFoods({});
      return FormateData(foodsListResult);
    } catch (err) {
      throw new Error("unable to list foods");
    }
  }

  async removeFoodById(id) {
    try {
      const deletedFood = await this.repository.RemoveFood(id);
      return FormateData(deletedFood);
    } catch (err) {
      throw new Error("unable to list foods");
    }
  }
}

module.exports = FoodService;
