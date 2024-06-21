const OrderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

class OrderRepository {
  async saveOrder(userId, items, amount, address) {
    try {
      const newOrder = new OrderModel({
        userId: userId,
        items: items,
        amount: amount,
        address: address,
      });

      const orderData = await newOrder.save();
      return orderData;
    } catch (err) {
      throw new Error("unable to save the order");
    }
  }

  async updateUserOrders(userId) {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(userId, {
        cartData: {},
      });
      return updatedUser;
    } catch (err) {
      throw new Error();
    }
  }

  async verifyOrder(orderId, success) {
    let updatedPayment;
    try {
      if (success === "true") {
        updatedPayment = await OrderModel.findByIdAndUpdate(orderId, {
          payment: true,
        });
      } else {
        updatedPayment = await OrderModel.findByIdAndDelete(orderId);
      }
      return updatedPayment;
    } catch (err) {
      throw new Error("unable to verify order");
    }
  }

  async Orders(userId) {
    try {
      const userOrders = await OrderModel.find({ userId: userId });
      return userOrders;
    } catch (err) {
      throw new Error("unable to access user orders");
    }
  }
}

module.exports = OrderRepository;
