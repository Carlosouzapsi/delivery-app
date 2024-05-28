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
      return res.json({ success: true, message: "Food Added", data: data });
    } catch (err) {
      next(err);
    }
  });

  app.get("/food/list", async (req, res, next) => {
    try {
      const data = await foodService.listAllFoods();
      return res.json({ success: true, message: "Food Added", data: data });
    } catch (err) {
      throw new Error("unable to list foods");
    }
  });

  app.delete("/food/remove", async (req, res, next) => {
    const { id } = req.body.id;
    try {
      await foodService.removeFood(id);
      return res.json({ success: true, message: "Food removed" });
    } catch (err) {
      throw new Error("unable to remove foods");
    }
  });
};
