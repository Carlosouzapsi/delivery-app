const UserService = require("../services/userService");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const userService = new UserService();

  // TODO
  app.post("/user/register", () => {});

  // TODO
  app.post("/user/login", () => {});
};
