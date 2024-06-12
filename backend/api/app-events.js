// const ProductService = require("../services/product-service");
const FoodService = require("../services/foodService");
const UserService = require("../services/userService");

module.exports = (app) => {
  const service = new ProductService();

  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;

    service.SubscribeEvents(payload);
    console.log(
      "============================ Products Service receive Event ======"
    );
    return res.status(200).json(payload);
  });
};
