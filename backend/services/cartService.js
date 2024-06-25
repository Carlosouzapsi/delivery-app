const CartRepository = require("../repositories/cartRepository");
const { FormateData } = require("../utils/utils");
const { APIError } = require("../utils/app-errors");

class CartService {
  constructor() {
    this.repository = new CartRepository();
  }

  async manageCart(userId, itemId) {
    try {
      const cartResult = await this.repository.addToCart(userId, itemId);
      console.log("cart result: " + cartResult);
      return FormateData(cartResult);
    } catch (err) {
      throw new APIError(err);
    }
  }

  async removeItemFromCart(userId, itemId) {
    try {
      const cartResult = await this.repository.removeFromCart(userId, itemId);
      return FormateData(cartResult);
    } catch (err) {
      throw new APIError(err);
    }
  }

  async getUserCart(userId) {
    try {
      const cartResult = await this.repository.getCart(userId);
      return FormateData(cartResult);
    } catch (err) {
      console.log(err);
      throw new APIError(err);
    }
  }
}

module.exports = CartService;
