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
    it.only("Should create a new user account with valid information", function () {
      cy.getBySel("name").type(fakeUser.name);
      cy.getBySel("email").type(fakeUser.email);
      cy.getBySel("password").type(fakeUser.validPassword);

      cy.getBySel("privacy-policy-checkbox").click();
      cy.getBySel("sign-in-sign-up-button").click();
    });
    it("Should not create a new user account with blank name", function () {});
    it("Should not create a new user account with blank email", function () {});
    it("Should not create a new user account with invalid email", function () {});
    it("Should not create a new user account with blank password", function () {});
    it("Should not create a new user account with invalid password", function () {});
  });

  it("Should do login sucessfully", function () {});
});
