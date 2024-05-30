const UserRepository = require("../repositories/userRepository");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }
}

module.exports = UserService;
