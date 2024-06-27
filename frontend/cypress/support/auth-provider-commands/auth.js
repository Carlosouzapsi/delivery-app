Cypress.Commands.add("uiLogin", (email, password) => {
  const log = Cypress.log({
    name: "login",
    displayName: "LOGIN",
    message: [`Authenticating`, email],
    autoEnd: false,
  });
  cy.getBySel("email-input").type(email);
  cy.getBySel("password-input").type(password);
  cy.getBySel("privacy-policy-checkbox").click();
  cy.getBySel("sign-in-sign-up-button").click();
});

Cypress.Commands.add("apiSignUp", (name, email, password, confirmPassword) => {
  const log = Cypress.log({
    name: "apiSignUp",
    displayName: "apiSignUp",
    message: [`SignUp`, name, email, password, confirmPassword],
    autoEnd: false,
  });

  cy.request({
    // need pass server URL as env variable
    url: "http://localhost:4001/user/register",
    method: "POST",
    body: {
      name: `${name}`,
      email: `${email}`,
      password: `${password}`,
      confirmPassword: `${confirmPassword}`,
    },
  }).then((response) => {
    expect(response.status).eq(200);
  });
  log.end();
});
