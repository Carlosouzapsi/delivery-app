import signInSignupPopUp from "./signinSignupPopUp";

class SignSignupPopUpActions {
  static fillRegisterUserForm(name, email, password, confirmPassword) {
    signInSignupPopUp.fillNewUserName(name);
    signInSignupPopUp.fillNewUserEmailField(email);
    signInSignupPopUp.fillNewUserPasswordField(password);
    signInSignupPopUp.fillNewUserConfirmPasswordField(confirmPassword);
  }

  static assertNameInputErrors() {
    signInSignupPopUp.assertSignUpNameInputError();
    signInSignupPopUp.assertNameErrorText();
  }

  static assertEmailInputErrors() {
    signInSignupPopUp.assertSignUpEmailInputError();
    signInSignupPopUp.assertEmailErrorText();
  }

  static assertPasswordInputErrors() {
    signInSignupPopUp.assertSignUpPasswordInputError();
    signInSignupPopUp.assertPasswordErrorText();
  }

  static assertConfirmPasswordInputErrors() {
    signInSignupPopUp.assertSignUpConfirmPasswordInputError();
    signInSignupPopUp.assertConfirmPasswordErrorText();
  }
}

export default SignSignupPopUpActions;
