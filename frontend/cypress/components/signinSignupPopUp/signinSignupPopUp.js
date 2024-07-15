import { TestingTool } from "../../support/TestingTool/TestingTool";
import { pageElements, pageTexts } from "./elements";

class signInSignupPopUp {
  static goTo(home) {
    return TestingTool.goTo(home);
  }
  // Usar métodos estáticos
  static clickOnSignInBtn() {
    return TestingTool.clickOnElement({ element: pageElements.signin_button });
  }

  static clickOnLoginLinkBtn() {
    return TestingTool.clickOnElement({
      element: pageElements.loginPopUp_button_link,
    });
  }

  static clickOnCheckboxPolicyTerms() {
    return TestingTool.clickOnElement({
      element: pageElements.privacy_policy_checkbox,
    });
  }

  static clickOnCreateAccountBtn() {
    return TestingTool.clickOnElement({
      element: pageElements.create_account_button,
    });
  }

  static fillNewUserName(name) {
    return TestingTool.typeInElement({
      element: pageElements.name_input,
      text: name,
    });
  }

  static fillNewUserEmailField(email) {
    return TestingTool.typeInElement({
      element: pageElements.email_input,
      text: email,
    });
  }

  static fillNewUserPasswordField(password) {
    TestingTool.typeInElement({
      element: pageElements.password_input,
      text: password,
    });
  }
  static fillNewUserConfirmPasswordField(confirmPassword) {
    TestingTool.typeInElement({
      element: pageElements.confirm_password_input,
      text: confirmPassword,
    });
  }

  static clearNewUserNameField() {
    return TestingTool.clearElement({ element: pageElements.name_input });
  }

  static assertSignUpNameInputError() {
    return TestingTool.assertElementExists({
      element: pageElements.required_name_error_msg,
    });
  }

  static assertSignUpEmailInputError() {
    return TestingTool.assertElementExists({
      element: pageElements.required_email_error_msg,
    });
  }

  static assertSignUpPasswordInputError() {
    return TestingTool.assertElementExists({
      element: pageElements.weak_password_error_msg,
    });
  }

  static assertSignUpConfirmPasswordInputError() {
    return TestingTool.assertElementExists({
      element: pageElements.confirm_password_error_msg,
    });
  }

  static assertNameErrorText() {
    return TestingTool.assertContainsText(pageTexts.name_field_error_text);
  }

  static assertEmailErrorText() {
    return TestingTool.assertContainsText(pageTexts.email_field_error_text);
  }

  static assertPasswordErrorText() {
    return TestingTool.assertContainsText(
      pageTexts.weak_password_field_error_text
    );
  }

  static assertConfirmPasswordErrorText() {
    return TestingTool.assertContainsText(
      pageTexts.confirm_password_field_error_text
    );
  }

  static clearNewUserNameField() {
    return TestingTool.clearElement({ element: pageElements.name_input });
  }

  static clearNewUserEmailField() {
    return TestingTool.clearElement({ element: pageElements.email_input });
  }

  static clearNewUserPasswordField() {
    return TestingTool.clearElement({ element: pageElements.password_input });
  }
  static assertPopUpTitle(title) {
    TestingTool.assertContainsText(title);
  }

  static assertAvatarLoggedUserIcon() {
    TestingTool.assertVisibleElement({
      element: pageElements.profile_icon_logged_user,
    });
  }

  static assertCreateAccountBtnIsDisabled() {
    return TestingTool.assertElementIsDisabled(
      pageElements.create_account_button
    );
  }
}

export default signInSignupPopUp;
