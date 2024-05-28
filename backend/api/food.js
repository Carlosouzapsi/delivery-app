const FoodService = require("../services/foodService");
const { ManageUpload } = require("../utils/utils");

module.exports = (app) => {
  const foodService = new FoodService();
  app.post("/food/add", ManageUpload("image"), async (req, res, next) => {
    const { name, description, price, category } = req.body;
    const image_filename = req.file ? req.file.filename : "";
    try {
      const { data } = await foodService.addNewFood({
        name,
        description,
        price,
        image: image_filename,
        category,
      });
      return res.json(data);
      return res.json({ success: true, message: "Food Added" });
    } catch (err) {
      next(err);
    }
  });
};
