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
}

module.exports = OrderRepository;
