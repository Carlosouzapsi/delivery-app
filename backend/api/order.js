const OrderService = require("../services/orderService");
const UserService = require("../services/userService");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const orderService = new OrderService();
  const userService = new UserService();

  app.post("/order/place", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { items, amount, address } = req.body;

      const { data } = await orderService.placeOrder(
        _id,
        items,
        amount,
        address
      );
      await orderService.updateUserOrders(_id);
      return res.json({
        success: true,
        message: "order successfully placed",
        data,
      });
    } catch (err) {
      next(err);
    }
  });

  app.post("/order/verify", async (req, res, next) => {
    const { orderId, success } = req.body;
    try {
      const { data } = await orderService.verifyUserOrders(orderId, success);
      return res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  });

  app.get("/order/userorders", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const orders = await orderService.userOrders(_id);
      res.json({ success: true, data: orders });
    } catch (err) {
      next(err);
    }
  });
};
