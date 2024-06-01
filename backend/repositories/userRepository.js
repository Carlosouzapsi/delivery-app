const UserModel = require("../models/userModel");

class UserRepository {
  async signUp({ name, password, email }) {
    try {
      const user = UserModel({
        name,
        password,
        email,
      });
      return user;
    } catch (err) {
      throw new Error("unable to create a new user");
    }
  }
  async login() {}
}

module.exports = UserRepository;
