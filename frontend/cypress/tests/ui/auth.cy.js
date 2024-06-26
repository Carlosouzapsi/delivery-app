import { fakeUser } from "../../support/utils";

describe("User Signup and Login", function () {
  context("Signup", function () {
    before(function () {
      cy.visit("/");
      cy.getBySel("signin-button").should("exist").click();
      cy.getBySel("login-popup-title")
        .should("be.visible")
        .and("contain", "Sign Up");
    });
    it("Should create a new user account with valid information", function () {
      cy.getBySel("name-input").type(fakeUser.name);
      cy.getBySel("email-input").type(fakeUser.email);
      cy.getBySel("password-input").type(fakeUser.validPassword);
      cy.getBySel("confirm-password-input").type(fakeUser.validPassword);

      cy.getBySel("privacy-policy-checkbox").click();
      cy.getBySel("sign-in-sign-up-button").click();
    });
    it.only("Should not create a new user account with blank name", function () {
      cy.getBySel("name-input").type("a").clear();
      cy.getBySel("email-input").type(fakeUser.email);
      cy.getBySel("password-input").type(fakeUser.validPassword);
      cy.getBySel("confirm-password-input").type(fakeUser.validPassword);
      cy.getBySel("privacy-policy-checkbox").click();
      cy.getBySel("sign-in-sign-up-button").should("be.disabled");

      const nameErrorMsg = "Name field is required";
      cy.getBySel("required-name-error-msg").should("contain", nameErrorMsg);
    });
    it("Should not create a new user account with blank email", function () {});
    it("Should not create a new user account with invalid email", function () {});
    it("Should not create a new user account with blank password", function () {});
    it("Should not create a new user account with invalid password", function () {});
  });

  it("Should do login sucessfully", function () {});
});
