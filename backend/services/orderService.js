const OrderRepository = require("../repositories/orderRepository");
const { APIError } = require("../utils/app-errors");
const {
  ManageUpload,
  FormateData,
  createStripeLineItems,
} = require("../utils/utils");

class OrderService {
  constructor() {
    this.OrderRepository = new OrderRepository();
  }
  async placeOrder(userId, items, amount, address) {
    let stripeItems;
    try {
      const newOrder = await this.OrderRepository.saveOrder(
        userId,
        items,
        amount,
        address
      );
      if (savedOrder) {
        stripeItems = await createStripeLineItems(newOrder._id, items);
      }
      return FormateData({ orderResult, stripeItems });
    } catch (err) {
      console.error(err);
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
