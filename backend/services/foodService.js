const FoodRepository = require("../repositories/foodRepository");
const { ManageUpload, FormateData } = require("../utils/utils");

class FoodService {
  constructor() {
    this.repository = new FoodRepository();
  }

  async addNewFood(FoodInputs) {
    try {
      const foodResult = await this.repository.AddFood(FoodInputs);

      return FormateData(foodResult);
    } catch (err) {
      throw new Error("unable to add product");
    }
  }
}

module.exports = FoodService;
