import * as type from "./types";

/**
 * TestingLibAdapter class methods encapsulate Cypress.
 * They should be used instead of native Cypress commands.
 * No native Cypress commands should be found outside this file (exception to configuration files).
 */
export class TestingLibAdapter {
  /*
   *  Go to the given page
   */
  static visit(page) {
    cy.visit(page);
  }
  /**
   * Wait for a number of milliseconds or wait for an aliased resource to resolve before moving on to the next command.
   * Caution: With fixed time should not be used frequently.
   */
  static wait(value) {
    return cy.wait(value);
  }

  /**
   * Reload the page.
   */
  static reload() {
    return cy.reload();
  }

  /**
   * Get the element by the provided attribute.
   */
  static getElement(element, timeout = type.Timeouts.SHORT) {
    return cy.get(element, { timeout });
  }

  /**
   * Finds the element by the provided attribute and can use its position and then validates whether it is visible.
   * @param position - Position of the given element, if it is the only/first one, there is no need to assign value to this parameter.
   */
  static assertVisibleElement({
    element,
    timeout = type.Timeouts.SHORT,
    position = 0,
  }) {
    return cy
      .get(element, { timeout })
      .eq(position)
      .should("be.visible", { timeout });
  }
  /**
   * Finds the element by a given attribute and can use its position and then click on it.
   * @param position - Position of the given element, if it is the only/first one, there is no need to assign value to this parameter.
   */
  static clickOnElement({
    element,
    force = false,
    multiple = false,
    timeout = type.Timeouts.SHORT,
    position = 0,
    clickPosition = "center",
  }) {
    cy.get(element, { timeout })
      .eq(position)
      .click(clickPosition, { force, multiple });
  }
  /**
   * Type the field in given element.
   */
  static typeInElement({ element, text, timeout = type.Timeouts.SHORT }) {
    cy.get(element, { timeout }).type(text);
  }
  /**
   * Clear the field in given element.
   */
  static clearElement({ element, timeout = type.Timeouts.SHORT }) {
    cy.get(element, { timeout }).clear();
  }

  /**
   * Validates that there is text on the page.
   */
  static assertContainsText(text) {
    cy.contains(text).should("be.visible");
  }

  /**
   * Finds the element by the given attribute and text value and clicks on it.
   * @param value - Value contained in the given element to trigger the click.
   */
  static clickOnElementByTextValue({
    element,
    value,
    multiple = false,
    force = false,
    timeout = type.Timeouts.SHORT,
  }) {
    cy.get(element, { timeout }).contains(value).click({ force, multiple });
  }

  static assertElementExists({
    element,
    timeout = type.Timeouts.SHORT,
    position = 0,
  }) {
    cy.get(element, { timeout }).eq(position).should("exist");
  }

  /**
   * Validates whether the element is enabled.
   */

  static assertElementIsEnabled(element, timeout = type.Timeouts.SHORT) {
    cy.get(element, { timeout }).should("be.enabled");
  }

  /**
   * Validates whether the element is disabled.
   */
  static assertElementIsDisabled(element, timeout = type.Timeouts.SHORT) {
    cy.get(element, { timeout }).should("be.disabled");
  }
}
