import { TestingLibAdapter } from "./TestingLibAdapter";
import { Storage } from "../shared/generalClasses/Storage";
import { pageElements, pageTexts } from "./elements";

export class TestingTool extends TestingLibAdapter {
  /**
   * Go to the indicated page and wait for the first load.
   */
  static goTo(page) {
    this.visit(page);
    // this.waitForLoading();
  }

  /*
   * Wait for the first load.
   */

  //   static waitForLoading() {
  //     this.assertElementExists({ element: pageElements.content_page_identifier });
  //   }
}