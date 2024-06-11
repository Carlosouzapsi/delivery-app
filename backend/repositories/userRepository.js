const UserModel = require("../models/userModel");

class UserRepository {
  async SignUp({ name, password, email }) {
    try {
      const user = await UserModel({
        name,
        password,
        email,
      });
      const userResult = await user.save();
      return userResult;
    } catch (err) {
      throw new Error("unable to register a new user");
    }
  }
  async Login() {}

  async FindUserByEmail(email) {
    try {
      const userResult = await UserModel.findOne({ email });
      return userResult;
    } catch (err) {
      throw new Error("unable to found user");
    }
  }
}

module.exports = UserRepository;
