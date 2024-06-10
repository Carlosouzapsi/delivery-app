const UserRepository = require("../repositories/userRepository");
const {
  FormateData,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} = require("../utils/utils");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async registerUser(userInputs) {
    const { email, password } = userInputs;

    try {
      const existingCustomer = await this.repository.FindUser({ email });
      if (existingCustomer) {
        password, existingCustomer.password, existingCustomer.salt;
      }
      if (ValidatePassword) {
        const token = await GenerateSignature({
          email: existingCustomer.email,
          _id: existingCustomer._id,
        });
        return FormateData({ id: existingCustomer._id, token });
      }
      return FormateData(null);
    } catch (err) {
      throw new Error("unable to register user");
    }
  }
}

module.exports = UserService;
