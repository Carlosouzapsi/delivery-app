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
      throw new Error(err);
    }
  }

  // Remove items from cart
  async removeFromCart(userId, itemId) {
    try {
      let userData = await userModel.findById(userId);
      let cartData = await userData.cartData;
      if (cartData[itemId] > 0) {
        cartData[itemId] -= 1;
      }
      await userModel.findByIdAndUpdate(userId, {
        cartData,
      });
      return cartData;
    } catch (err) {
      throw new Error(err);
    }
  }

  // Get items from cart
  async getCart(userId) {
    try {
      let userData = await userModel.findById(userId);
      let cartData = await userData.cartData;
      return cartData;
    } catch (err) {
      throw new Error("unable to get the cartData");
    }
  }
}

module.exports = CartRepository;
