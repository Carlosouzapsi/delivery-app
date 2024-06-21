describe("User Signup and Login", function () {
  before(function () {
    cy.visit("/");
  });
  it("Should create a new user account with valid information", function () {});
  it("Should not create a new user account with blank name", function () {});
  it("Should not create a new user account with blank email", function () {});
  it("Should not create a new user account with invalid email", function () {});
  it("Should not create a new user account with blank password", function () {});
  it("Should not create a new user account with invalid password", function () {});

  it("Should do login sucessfully", function () {});
});
