const UserRepository = require("../repositories/userRepository");
const {
  FormateData,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
  GeneratePassword,
} = require("../utils/utils");
const validator = require("validator");
const { APIError } = require("../utils/app-errors");
const { ValidationError } = require("../utils/app-errors");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }
  // Review methods parameters
  async registerUser(userInputs) {
    const { name, email, password } = userInputs;
    try {
      const existingUser = await this.repository.FindUserByEmail({ email });

      if (existingUser) {
        throw new ValidationError("user already exists");
      }
      if (!validator.isEmail(email)) {
        throw new ValidationError("Please enter a valid email");
      }
      if (password.length < 5) {
        throw new ValidationError("Please enter a strong password");
      }

      let salt = await GenerateSalt();
      let hashedPassword = await GeneratePassword(password, salt);
      const newUser = await this.repository.SignUp({
        name,
        email: email,
        password: hashedPassword,
        salt,
      });

      const token = await GenerateSignature({
        email: email,
        _id: newUser._id,
      });

      return FormateData({
        id: newUser._id,
        token,
      });
    } catch (err) {
      throw err;
    }
  }

  async loginUser(userInputs) {
    const { email, password } = userInputs;
    try {
      const existingUser = await this.repository.FindUserByEmail({ email });
      if (existingUser) {
        const validPassword = await ValidatePassword(
          password,
          existingUser.password,
          existingUser.salt
        );

        if (validPassword) {
          const token = await GenerateSignature({
            email: existingUser.email,
            _id: existingUser._id,
          });
          return FormateData({ id: existingUser._id, token });
        }
      }
      throw new ValidationError("incorrect email or password");
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;
