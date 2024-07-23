import signInSignupPopUp from "./signinSignupPopUp";

class SignSignupPopUpActions {
  static fillRegisterUserForm(name, email, password, confirmPassword) {
    signInSignupPopUp.fillNewUserName(name);
    signInSignupPopUp.fillNewUserEmailField(email);
    signInSignupPopUp.fillNewUserPasswordField(password);
    signInSignupPopUp.fillNewUserConfirmPasswordField(confirmPassword);
  }

  static fillLoginForm(email, password) {
    signInSignupPopUp.fillNewUserEmailField(email);
    signInSignupPopUp.fillNewUserPasswordField(password);
  }

  static assertNameInputErrors() {
    signInSignupPopUp.assertSignUpNameInputError();
    signInSignupPopUp.assertNameErrorText();
  }

  static assertEmailInputErrors() {
    signInSignupPopUp.assertSignUpEmailInputError();
    signInSignupPopUp.assertEmailErrorText();
  }

  static assertEmailInputRequiredErrors() {
    signInSignupPopUp.assertSignUpEmailInputRequiredError();
    signInSignupPopUp.assertEmailErrorRequiredText();
  }

  static assertPasswordInputErrors() {
    signInSignupPopUp.assertSignUpPasswordInputError();
    signInSignupPopUp.assertPasswordErrorText();
  }

  static assertConfirmPasswordInputErrors() {
    signInSignupPopUp.assertSignUpConfirmPasswordInputError();
    signInSignupPopUp.assertConfirmPasswordErrorText();
  }

  static assertInvalidEmailPasswordErrors() {
    signInSignupPopUp.assertInvalidEmailPasswordErrorToast();
    signInSignupPopUp.assertInvalidEmailPasswordErrorToastText();
  }
}

export default SignSignupPopUpActions;
