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
}

export default SignSignupPopUpActions;
