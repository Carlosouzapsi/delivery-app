const UserRepository = require("../repositories/userRepository");
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
    } catch (error) {
      console.log(error);
      throw new APIError(error);
    }
  }
}

module.exports = CartService;
