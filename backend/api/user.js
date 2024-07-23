const UserService = require("../services/userService");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const userService = new UserService();

  app.post("/user/register", async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
      const { data } = await userService.registerUser({
        name,
        email,
        password,
        confirmPassword,
      });
      return res.json({ success: true, message: "User added", data: data });
    } catch (err) {
      next(err);
    }
  });

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

  app.get("/user/profile", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const data = await userService.listUser(_id);
      return res.json({
        success: true,
        message: "user listed successfully",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  });

  app.patch("/user/profile", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { name, password, confirmPassword } = req.body;
    try {
      const { data } = await userService.updateUser(_id, {
        name,
        password,
        confirmPassword,
      });
      return res.json({
        success: true,
        message: "user updated successfully",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  });

  app.post("/user/forgot-password", async (req, res, next) => {
    const { email } = req.body;
    try {
      const { data } = await userService.forgotUserPasswordRecoverLink(email);
      return res.json({
        success: true,
        message: "recovery link generated",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  });

  app.post("/user/reset-password/:token", async (req, res, next) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    try {
      const { data } = await userService.updateUserForgotPassword(
        token,
        password,
        confirmPassword
      );
      return res.json({
        success: true,
        message: "password updated",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  });
};
