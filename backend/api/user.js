const UserService = require("../services/userService");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const userService = new UserService();

  app.post("/user/register", async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
      const { data } = await userService.registerUser({
        name,
        email,
        password,
      });
      return res.json({ success: true, message: "User added", data: data });
    } catch (err) {
      next(err);
    }
  });

  // TODO
  app.post("/user/login", async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const { data } = await userService.loginUser({ email, password });
      return res.json({
        success: true,
        message: "user logged successfully",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  });
};
