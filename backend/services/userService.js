const UserRepository = require("../repositories/userRepository");
const {
  FormateData,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
  GeneratePassword,
} = require("../utils/utils");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }
  // TODO review
  async registerUser(userInputs) {
    const { name, email, password } = userInputs;
    try {
      // TODO need to create a find user by email specific method on repositories
      const existingCustomer = await this.repository.FindUser({ email });
      if (existingCustomer) {
        return res.json({ success: false, message: "User already exists" });
      }
      if (!validator.isEmail(email)) {
        return res.json({
          success: false,
          message: "Please enter a valid email",
        });
      }
      if (password.length < 8) {
        return res.json({
          success: false,
          message: "Please enter a strong password",
        });
      }

      const salt = await GenerateSalt();
      const hashedPassword = await GeneratePassword(password, salt);

      const newUser = await this.repository.SignUp({
        name: name,
        email: email,
        password: hashedPassword,
      });
      console.log(newUser);
      const token = await GenerateSignature(newUser._id);

      return FormateData(newUser, token);
    } catch (err) {
      throw new Error("unable to register user");
    }
  }
}

module.exports = UserService;
