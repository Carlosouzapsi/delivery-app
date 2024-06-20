const OrderRepository = require("../repositories/orderRepository");
const { APIError } = require("../utils/app-errors");
const { ManageUpload, FormateData } = require("../utils/utils");

class OrderService {
  constructor() {
    this.OrderRepository = new OrderRepository();
  }
  async placeOrder(userId, items, amount, address) {
    try {
      const orderResult = this.OrderRepository.saveOrder(
        userId,
        items,
        amount,
        address
      );
      return FormateData(orderResult);
    } catch (err) {
      throw err;
    }
  }

  async updateUserOrders(userId) {
    try {
      const updatedUserOrders = await this.OrderRepository.updateUserOrders(
        userId
      );
      return FormateData(updatedUserOrders);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = OrderService;
