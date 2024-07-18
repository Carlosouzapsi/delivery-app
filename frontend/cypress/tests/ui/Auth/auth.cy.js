import { fakeUser, fakeUserLogin } from "../../../support/utils";
import signInSignupPopUp from "../../../components/signinSignupPopUp/signinSignupPopUp";
import signSignupPopUpActions from "../../../components/signinSignupPopUp/actions";
import { Storage } from "../../../support/shared/generalClasses/Storage";
import { Requests } from "../../../support/shared/generalClasses/Requests";
describe("User Signup and Login", function () {
  context("Signup", function () {
    beforeEach(function () {
      signInSignupPopUp.goTo("/");
      // signInSignupPopUp.goTo("http://localhost:5173");
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
  context.only("Signin", function () {
    before(function () {
      // Body equals to false
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

    it.only("Should do login sucessfully", function () {
      signSignupPopUpActions.fillLoginForm(
        fakeUserLogin.email,
        fakeUserLogin.validPassword
      );
      signInSignupPopUp.clickOnCheckboxPolicyTerms();
      signInSignupPopUp.clickOnCreateAccountBtn();

      signInSignupPopUp.assertAvatarLoggedUserIcon();
    });
    it("Should not do login with an not registered email", function () {
      cy.getBySel("email-input").type("invalid@email.com");
      cy.getBySel("password-input").type(fakeUser.validPassword);
      cy.getBySel("privacy-policy-checkbox").click();
      cy.getBySel("sign-in-sign-up-button").click();

      const errorMessage = "invalid email or password";
      cy.get(".Toastify__toast--error")
        .should("be.visible")
        .and("contain", errorMessage);
    });
    it("Should not do login with a blank email", function () {
      cy.getBySel("email-input").type("a").clear();
      cy.getBySel("password-input").type(fakeUser.validPassword);
      cy.getBySel("privacy-policy-checkbox").click();
      cy.getBySel("sign-in-sign-up-button").click();
      cy.get('[data-cy="required-email-error-msg"]');
      const errorEmailMessage = "Email field is required";
      cy.getBySel("required-email-error-msg").should(
        "contain",
        errorEmailMessage
      );
    });
    it("Should not do login with a invalid password", function () {
      cy.getBySel("email-input").type(fakeUserLogin.email).clear();
      cy.getBySel("password-input").type(fakeUser.validPassword);
      cy.getBySel("privacy-policy-checkbox").click();
      cy.getBySel("sign-in-sign-up-button").click();
      const errorPasswordMessage = "invalid email or password";
      cy.getBySel("password-error-msg").should("contain", errorPasswordMessage);
    });
  });
});
