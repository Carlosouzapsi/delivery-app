import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/tests/**/*.cy.{js,jsx}",
    supportFile: "cypress/support/e2e.js",
    experimentalRunAllSpecs: true,
  },
});
