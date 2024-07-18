const OrderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

class UtilsRepository {
  async clearData() {
    try {
      await userModel.deleteMany({});
      await OrderModel.deleteMany({});
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = UtilsRepository;
