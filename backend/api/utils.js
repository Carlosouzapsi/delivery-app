const UtilsService = require("../services/utilsService");

module.exports = (app) => {
  const utilsService = new UtilsService();
  app.delete("/clear-data", async (req, res) => {
    try {
      await utilsService.clearDataService();
      return res.json({ success: true, message: "data cleared" });
    } catch (err) {
      next(err);
    }
  });
};
