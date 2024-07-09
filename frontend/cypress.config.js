import { defineConfig } from "cypress";
import cypressMochawesomeReporter from "cypress-mochawesome-reporter/plugin.js";

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      cypressMochawesomeReporter(on);
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/tests/**/*.cy.{js,jsx}",
    supportFile: "cypress/support/e2e.js",
    experimentalRunAllSpecs: true,
  },
});
