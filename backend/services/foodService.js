const FoodRepository = require("../repositories/foodRepository");
const { ManageUpload, FormateData } = require("../utils/utils");

class FoodService {
  constructor() {
    this.repository = new FoodRepository();
  }

  async addNewFood(foodInputs) {
    try {
      const foodResult = await this.repository.AddFood(foodInputs);
      return FormateData(foodResult);
    } catch (err) {
      throw new Error("unable to add food");
    }
  }
}

module.exports = FoodService;
