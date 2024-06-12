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
  // FOR LOGGER AND FUTURE USERS
  // async GetProductPayload(userId, { productId, qty }, event) {
  //   const product = await this.repository.FindById(productId);

  //   if (product) {
  //     const payload = {
  //       event: event,
  //       data: { userId, product, qty },
  //     };
  //     return FormateData(payload);
  //   } else {
  //     return FormateData({ error: "No product available" });
  //   }
  // }

  // FOR LOGGER AND FUTURE USERS
  // async SubscribeEvents(payload) {
  //   const { event, data } = payload;

  //   const { userId, product, order, qty } = data;

  //   switch (event) {
  //     case "ADD_TO_WISHLIST":
  //     case "REMOVE_FROM_WISHLIST":
  //       this.AddToWishList(userId, product);
  //       break;
  //     case "ADD_TO_CART":
  //       this.ManageCart(userId, product, qty, false);
  //       break;
  //     case "REMOVE_FROM_CART":
  //       this.ManageCart(userId, product, qty, true);
  //       break;
  //     case "CREATE_ORDER":
  //       this.ManageOrder(userId, order);
  //       break;
  //     default:
  //       break;
  //   }
  // }
}

module.exports = FoodRepository;
