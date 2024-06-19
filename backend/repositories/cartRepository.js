const userModel = require("../models/userModel");
const UserModel = require("../models/userModel");

class CartRepository {
  //Add items to user cart
  async addToCart(userId, itemId) {
    try {
      let userData = await userModel.findOne({
        _id: userId,
      });
      let cartData = await userData.cartData;
      if (!cartData[itemId]) {
        cartData[itemId] = 1;
      } else {
        cartData[itemId] += 1;
      }
      await userModel.findByIdAndUpdate(userId, {
        cartData,
      });
      return cartData;
    } catch (err) {
      console.error(err);
      throw new Error("unable to add to cart");
    }
  }

  // Remove items from cart
  async removeFromCart() {}

  // Get items from cart
  async getCart() {}
}

module.exports = CartRepository;
