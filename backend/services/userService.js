const UserRepository = require("../repositories/userRepository");
// const {
//   FormateData,
//   GenerateSalt,
//   GenerateSignature,
//   ValidatePassword,
// } = require("../utils/utils");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async createUser(userInputs) {}
}

module.exports = UserService;
