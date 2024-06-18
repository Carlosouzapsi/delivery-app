const UserModel = require("../models/userModel");

class UserRepository {
  async SignUp({ name, email, password, salt }) {
    try {
      const user = await UserModel({
        name,
        email,
        password,
        salt,
      });
      const userResult = await user.save();
      return userResult;
    } catch (err) {
      throw new Error("unable to register user");
    }
  }

  async FindUserByEmail({ email }) {
    try {
      const userResult = await UserModel.findOne({ email });
      return userResult;
    } catch (err) {
      throw new Error("unable to find user");
    }
  }
}

module.exports = UserRepository;
