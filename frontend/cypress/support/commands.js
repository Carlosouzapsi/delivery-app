// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

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

// Logout command
Cypress.Commands.add("logout", () => {
  cy.window().its("localStorage").invoke("removeItem", "session");
});
