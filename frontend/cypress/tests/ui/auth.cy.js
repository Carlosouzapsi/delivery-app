import { fakeUser, fakeUserLogin } from "../../support/utils";

describe("User Signup and Login", function () {
  context("Signup", function () {
    beforeEach(function () {
      cy.logout();
      cy.visit("/");
      cy.getBySel("signin-button").should("exist").click();
      cy.getBySel("login-popup-title")
        .should("be.visible")
        .and("contain", "Sign Up");
    });
    after(function () {
      cy.logout();
    });
    it("Should create a new user account with valid information", function () {
      cy.getBySel("name-input").type(fakeUser.name);
      cy.getBySel("email-input").type(fakeUser.email);
      cy.getBySel("password-input").type(fakeUser.validPassword);
      cy.getBySel("confirm-password-input").type(fakeUser.validPassword);

      cy.getBySel("privacy-policy-checkbox").click();
      cy.getBySel("sign-in-sign-up-button").click();
    });
    it("Should not create a new user account with blank name", function () {
      cy.getBySel("name-input").type("a").clear();
      cy.getBySel("email-input").type(fakeUser.email);
      cy.getBySel("password-input").type(fakeUser.validPassword);
      cy.getBySel("confirm-password-input").type(fakeUser.validPassword);
      cy.getBySel("privacy-policy-checkbox").click();
      cy.getBySel("sign-in-sign-up-button").should("be.disabled");
      const nameErrorMsg = "Name field is required";
      cy.getBySel("required-name-error-msg").should("contain", nameErrorMsg);
    });
    it("Should not create a new user account with blank email", function () {
      cy.getBySel("name-input").type(fakeUser.name);
      cy.getBySel("email-input").type("a").clear();
      cy.getBySel("password-input").type(fakeUser.validPassword);
      cy.getBySel("confirm-password-input").type(fakeUser.validPassword);

      cy.getBySel("privacy-policy-checkbox").click();

      cy.getBySel("sign-in-sign-up-button").should("be.disabled");
      const emailErrorMsg = "Please type a valid email address";
      cy.getBySel("valid-email-error-msg").should("contain", emailErrorMsg);
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
  context("Signin", function () {
    const userCredentials = {
      name: fakeUserLogin.name,
      email: fakeUserLogin.email,
      password: fakeUserLogin.validPassword,
      confirmPassword: fakeUserLogin.validPassword,
    };
    before(function () {
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
  });
});
