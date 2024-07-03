export class Storage {
  // not able to use public word with JS only with TS
  static apiUserLogout() {
    return cy.window().its("localStorage").invoke("removeItem", "session");
  }
}
