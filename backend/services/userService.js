const UserRepository = require("../repositories/userRepository");
const {
  FormateData,
  GenerateSalt,
  GenerateSignature,
  ValidateResetToken,
  ValidatePassword,
  GeneratePassword,
  nodeMailerConfig,
} = require("../utils/utils");
const validator = require("validator");
const { APIError, ValidationError } = require("../utils/app-errors");
const { validate } = require("../models/userModel");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }
  async registerUser(userInputs) {
    const { name, email, password, confirmPassword } = userInputs;
    try {
      const existingUser = await this.repository.FindUserByEmail({ email });

      if (password.length < 5) {
        throw new ValidationError("Please enter a strong password");
      }

      if (password !== confirmPassword) {
        throw new ValidationError("Password does not match");
      }

      if (!validator.isEmail(email)) {
        throw new ValidationError("Please enter a valid email");
      }

      if (existingUser) {
        throw new ValidationError("user already exists");
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
      console.log(existingUser);
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
      throw new ValidationError("invalid email or password");
    } catch (err) {
      throw err;
    }
  }

  async listUser(userId) {
    try {
      const existingUser = await this.repository.listUserProfile(userId);
      if (existingUser) {
        return FormateData({
          userId: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
        });
      }
    } catch (err) {
      throw err;
    }
  }

  async updateUser(userId, updatedUserInputs) {
    try {
      if (updatedUserInputs.password) {
        if (updatedUserInputs.password !== updatedUserInputs.confirmPassword) {
          throw new ValidationError("Password does not match");
        }
        let salt = await GenerateSalt();
        let hashedPassword = await GeneratePassword(
          updatedUserInputs.password,
          salt
        );
        updatedUserInputs.password = hashedPassword;
        updatedUserInputs.salt = salt;
      }
      delete updatedUserInputs.confirmPassword;

      const userUpdated = await this.repository.updateUserById(
        userId,
        updatedUserInputs
      );

      return FormateData(userUpdated);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async forgotUserPasswordRecoverLink(email) {
    try {
      const existingUser = await this.repository.FindUserByEmail({ email });
      if (existingUser) {
        const token = await GenerateSignature({
          _id: existingUser._id,
        });
        const resetLink = `http://localhost:4001/user/reset-password/${token}`;
        const sendResetLinkMail = await nodeMailerConfig(email, resetLink);
        return FormateData({ sendResetLinkMail });
      }
    } catch (err) {
      throw err;
    }
  }

  async updateUserForgotPassword(token, password, confirmPassword) {
    try {
      if (password !== confirmPassword) {
        throw new ValidationError("Password does not match");
      }
      const validateUserToken = await ValidateResetToken(token);
      if (validateUserToken) {
        console.log(validateUserToken._id);
        console.log(password);
        let salt = await GenerateSalt();
        let hashedPassword = await GeneratePassword(password, salt);
        const userPasswordUpdated = await this.repository.updateUserById(
          validateUserToken._id,
          { password: hashedPassword, salt: salt }
        );
        return FormateData({ userPasswordUpdated });
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;
