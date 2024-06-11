const UserService = require("../services/userService");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const userService = new UserService();

  // TODO
  app.post("/user/register", async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
      const { data } = await userService.registerUser(email, password);
      return res.json({ success: true, message: "User added", data: data });
    } catch (err) {
      next(err);
    }
  });

  // TODO
  app.post("/user/login", () => {});
};
