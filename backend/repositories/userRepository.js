const UserModel = require("../models/userModel");

class UserRepository {
  async SignUp({ name, password, email }) {
    try {
      const user = UserModel({
        name,
        password,
        email,
      });
      const userResult = await user.save();
      return userResult;
    } catch (err) {
      throw new Error("unable to create a new user");
    }
  }
  async Login() {}
}

module.exports = UserRepository;
