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
      if (newOrder) {
        stripeItems = await createStripeLineItems(newOrder._id, items);
      }
      return FormateData({ newOrder, stripeItems });
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

  async verifyUserOrders(orderId, success) {
    try {
      const verifyUserOrderResult = await this.OrderRepository.verifyOrder(
        orderId,
        success
      );
      return FormateData(verifyUserOrderResult);
    } catch (err) {
      throw new APIError("unable to verify user order");
    }
  }

  async userOrders(userId) {
    try {
      const userOrdersResult = await this.OrderRepository.Orders(userId);
      return FormateData(userOrdersResult);
    } catch (err) {
      throw new APIError("unable user orders");
    }
  }

  async listOrdersAdminPanel() {
    try {
      const ordersResult = await this.OrderRepository.ListOrdersAdmin();
      return FormateData(ordersResult);
    } catch (err) {
      throw new APIError("unable to list orders to admin");
    }
  }

  async updateOrderStatus(orderId, updatedStatus) {
    try {
      const updateResult = await this.OrderRepository.updateOrderStatus(
        orderId,
        updatedStatus
      );
      return FormateData(updateResult);
    } catch (err) {
      throw new APIError("unable to update the order status");
    }
  }
}

module.exports = OrderService;
