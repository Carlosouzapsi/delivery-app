import { fakeUser, fakeUserLogin } from "../../../support/utils";
import signInSignupPopUp from "../../../components/signinSignupPopUp/signinSignupPopUp";
import signSignupPopUpActions from "../../../components/signinSignupPopUp/actions";
import { Storage } from "../../../support/shared/generalClasses/Storage";
describe("User Signup and Login", function () {
  context("Signup", function () {
    beforeEach(function () {
      signInSignupPopUp.goTo("/");
      signInSignupPopUp.clickOnSignInBtn();
      signInSignupPopUp.assertPopUpTitle("Sign Up");
    });
    after(function () {
      Storage.apiUserLogout();
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
    it.only("Should not create a new user account with blank email", function () {
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
      cy.getBySel("name-input").type(fakeUser.name);
      cy.getBySel("email-input").type("testmail.com");
      cy.getBySel("password-input").type(fakeUser.validPassword);
      cy.getBySel("confirm-password-input").type(fakeUser.validPassword);

      cy.getBySel("privacy-policy-checkbox").click();

      cy.getBySel("sign-in-sign-up-button").should("be.disabled");
      const emailErrorMsg = "Please type a valid email address";
      cy.getBySel("valid-email-error-msg").should("contain", emailErrorMsg);
    });
    it("Should not create a new user account with blank password", function () {
      cy.getBySel("name-input").type(fakeUser.name);
      cy.getBySel("email-input").type(fakeUser.email);
      cy.getBySel("password-input").type(fakeUser.validPassword).clear();
      cy.getBySel("confirm-password-input").type(fakeUser.validPassword);

      cy.getBySel("privacy-policy-checkbox").click();

      cy.getBySel("sign-in-sign-up-button").should("be.disabled");
      const passwordErrorMsg = "Password need at least 6 characters";
      cy.getBySel("invalid-password-error-msg").should(
        "contain",
        passwordErrorMsg
      );
    });
    it("Should not create a new user account with invalid password", function () {
      cy.getBySel("name-input").type(fakeUser.name);
      cy.getBySel("email-input").type(fakeUser.email);
      cy.getBySel("password-input").type("invalidPass");
      cy.getBySel("confirm-password-input").type(fakeUser.validPassword);

      cy.getBySel("privacy-policy-checkbox").click();

      cy.getBySel("sign-in-sign-up-button").should("be.disabled");
      const confirmPasswordErrorMsg = "Password does not match";
      cy.getBySel("confirm-password-error-msg").should(
        "contain",
        confirmPasswordErrorMsg
      );
    });
  });
  context.skip("Signin", function () {
    const userCredentials = {
      name: fakeUserLogin.name,
      email: fakeUserLogin.email,
      password: fakeUserLogin.validPassword,
      confirmPassword: fakeUserLogin.validPassword,
    };
    beforeEach(function () {
      cy.apiSignUp(
        userCredentials.name,
        userCredentials.email,
        userCredentials.password,
        userCredentials.confirmPassword
      );
      cy.logout();
      cy.visit("/");
      cy.getBySel("signin-button").should("exist").click();
      cy.getBySel("login-popup-title")
        .should("be.visible")
        .and("contain", "Sign Up");
      cy.getBySel("login-popup-link").should("exist").click();
    });
    afterEach(function () {
      cy.logout();
    });
    it("Should do login sucessfully", function () {
      cy.getBySel("email-input").type(fakeUser.email);
      cy.getBySel("password-input").type(fakeUser.validPassword);
      cy.getBySel("privacy-policy-checkbox").click();
      cy.getBySel("sign-in-sign-up-button").click();

      cy.getBySel("profile-icon-logged-user").should("be.visible");
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
