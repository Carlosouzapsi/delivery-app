const UserService = require("../services/userService");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const userService = new UserService();

  app.post("/user/register", () => {});

  app.post("user/login", () => {});
};
