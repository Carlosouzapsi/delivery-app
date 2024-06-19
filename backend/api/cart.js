const UserService = require("../services/userService");
const CartService = require("../services/cartService");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const userService = new UserService();
  const cartService = new CartService();

  app.post("/cart/add", UserAuth, async (req, res, next) => {
    const { itemId } = req.body;
    const { _id } = req.user;
    try {
      const { data } = await cartService.manageCart(_id, itemId);
      return res.json({ success: true, message: "added to cart", data });
    } catch (err) {
      next(err);
    }
  });

  app.post("/cart/remove", UserAuth, async (req, res, next) => {});

  app.get("/cart/list", UserAuth, async (req, res, next) => {});
};
