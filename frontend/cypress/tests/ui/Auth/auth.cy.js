import { fakeUser, fakeUserLogin } from "../../../support/utils";
import signInSignupPopUp from "../../../components/signinSignupPopUp/signinSignupPopUp";
import signSignupPopUpActions from "../../../components/signinSignupPopUp/actions";
import { Storage } from "../../../support/shared/generalClasses/Storage";
import { Requests } from "../../../support/shared/generalClasses/Requests";
describe("User Signup and Login", function () {
  context("Sign up", function () {
    before(function () {
      Requests.apiClearData();
    });
    beforeEach(function () {
      signInSignupPopUp.goTo("/");
      signInSignupPopUp.clickOnSignInBtn();
      signInSignupPopUp.assertPopUpTitle("Sign Up");
    });
    after(function () {
      Storage.userLogout();
    });
    it("Should create a new user account with valid information", function () {
      signSignupPopUpActions.fillRegisterUserForm(
        fakeUser.name,
        fakeUser.email,
        fakeUser.validPassword,
        fakeUser.validPassword
      );
      signInSignupPopUp.clickOnCheckboxPolicyTerms();
      signInSignupPopUp.clickOnCreateAccountBtn();

      signInSignupPopUp.assertAvatarLoggedUserIcon();
    });
    it("Should not create a new user account with blank name", function () {
      signSignupPopUpActions.fillRegisterUserForm(
        fakeUser.name,
        fakeUser.email,
        fakeUser.validPassword,
        fakeUser.validPassword
      );

      signInSignupPopUp.clickOnCheckboxPolicyTerms();
      signInSignupPopUp.clearNewUserNameField();

      signSignupPopUpActions.assertNameInputErrors();
      signInSignupPopUp.assertCreateAccountBtnIsDisabled();
    });
    it("Should not create a new user account with blank email", function () {
      signSignupPopUpActions.fillRegisterUserForm(
        fakeUser.name,
        fakeUser.email,
        fakeUser.validPassword,
        fakeUser.validPassword
      );

      signInSignupPopUp.clickOnCheckboxPolicyTerms();
      signInSignupPopUp.clearNewUserEmailField();

      signSignupPopUpActions.assertEmailInputErrors();
      signInSignupPopUp.assertCreateAccountBtnIsDisabled();
    });
    it("Should not create a new user account with invalid email", function () {
      signSignupPopUpActions.fillRegisterUserForm(
        fakeUser.name,
        "testmail.com",
        fakeUser.validPassword,
        fakeUser.validPassword
      );

      signInSignupPopUp.clickOnCheckboxPolicyTerms();

      signSignupPopUpActions.assertEmailInputErrors();
      signInSignupPopUp.assertCreateAccountBtnIsDisabled();
    });
    it("Should not create a new user account with blank password", function () {
      signSignupPopUpActions.fillRegisterUserForm(
        fakeUser.name,
        fakeUser.email,
        fakeUser.validPassword,
        fakeUser.validPassword
      );
      signInSignupPopUp.clearNewUserPasswordField();

      signInSignupPopUp.clickOnCheckboxPolicyTerms();
      signInSignupPopUp.assertCreateAccountBtnIsDisabled();

      signSignupPopUpActions.assertPasswordInputErrors();
    });
    it("Should not create a new user account with invalid password", function () {
      signSignupPopUpActions.fillRegisterUserForm(
        fakeUser.name,
        fakeUser.email,
        "invalidPass",
        fakeUser.validPassword
      );

      signInSignupPopUp.clickOnCheckboxPolicyTerms();

      signInSignupPopUp.assertCreateAccountBtnIsDisabled();
      signSignupPopUpActions.assertConfirmPasswordInputErrors();
    });
  });
  context("Sign in", function () {
    before(function () {
      Requests.apiClearData();
      const payload = {
        name: fakeUserLogin.name,
        email: fakeUserLogin.email,
        password: fakeUserLogin.validPassword,
        confirmPassword: fakeUserLogin.validPassword,
      };
      Requests.apiUserSignup(payload);
    });
    beforeEach(function () {
      signInSignupPopUp.goTo("/");
      signInSignupPopUp.clickOnSignInBtn();
      signInSignupPopUp.assertPopUpTitle("Sign Up");
      signInSignupPopUp.clickOnLoginLinkBtn();
    });
    afterEach(function () {
      Storage.userLogout();
    });

    it("Should do login sucessfully", function () {
      signSignupPopUpActions.fillLoginForm(
        fakeUserLogin.email,
        fakeUserLogin.validPassword
      );
      signInSignupPopUp.clickOnCheckboxPolicyTerms();
      signInSignupPopUp.clickOnCreateAccountBtn();

      signInSignupPopUp.assertAvatarLoggedUserIcon();
    });
    it("Should not do login with an not registered email", function () {
      signSignupPopUpActions.fillLoginForm(
        "invalid@email.com",
        fakeUserLogin.validPassword
      );
      signInSignupPopUp.clickOnCheckboxPolicyTerms();
      signInSignupPopUp.clickOnCreateAccountBtn();

      signSignupPopUpActions.assertInvalidEmailPasswordErrors();
    });
    it("Should not do login with a blank email", function () {
      signSignupPopUpActions.fillLoginForm(
        fakeUserLogin.email,
        fakeUserLogin.validPassword
      );
      signInSignupPopUp.clickOnCheckboxPolicyTerms();
      signInSignupPopUp.clearNewUserEmailField();

      signSignupPopUpActions.assertEmailInputRequiredErrors();
    });
    it("Should not do login with a invalid password", function () {
      signSignupPopUpActions.fillLoginForm(fakeUserLogin.email, "invalidTest");

      signInSignupPopUp.clickOnCheckboxPolicyTerms();
      signInSignupPopUp.clickOnCreateAccountBtn();
      signSignupPopUpActions.assertInvalidEmailPasswordErrors();
    });
  });
});
