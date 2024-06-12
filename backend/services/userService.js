const UserRepository = require("../repositories/userRepository");
const {
  FormateData,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
  GeneratePassword,
} = require("../utils/utils");
const validator = require("validator");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }
  // Review methods parameters
  async registerUser(userInputs) {
    const { name, email, password } = userInputs;
    try {
      const existingUser = await this.repository.FindUserByEmail(email);
      console.log(existingUser);
      if (existingUser) {
        throw new Error("User already exists");
        return res.json({ success: false, message: "User already exists" });
      }
      // if (!validator.isEmail(email)) {
      //   return res.json({
      //     success: false,
      //     message: "Please enter a valid email",
      //   });
      // }
      // if (password.length < 5) {
      //   return res.json({
      //     success: false,
      //     message: "Please enter a strong password",
      //   });
      // }

      const salt = await GenerateSalt();
      const hashedPassword = await GeneratePassword(password, salt);
      const newUser = await this.repository.SignUp({
        name: name,
        email: email,
        password: hashedPassword,
      });

      const token = await GenerateSignature(newUser._id);
      return FormateData(newUser, token);
    } catch (err) {
      console.error(err);
      throw new Error("unable to register user");
    }
  }
}

module.exports = UserService;
