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

  static fillNewUserName(name) {
    return TestingTool.typeInElement({
      element: pageElements.name_input,
      text: name,
    });
  }

  static fillNewUserEmailField(email) {
    return TestingTool.typeInElement({
      element: pageElements.name_input,
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
      element: pageElements.password_input,
      text: confirmPassword,
    });
  }

  static assertPopUpTitle(title) {
    TestingTool.assertContainsText(title);
  }
}

export default signInSignupPopUp;
