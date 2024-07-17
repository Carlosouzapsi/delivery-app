import { TestingTool } from "../../TestingTool/TestingTool";

export class Storage {
  // not able to use public word with JS only with TS
  static userLogout() {
    TestingTool.removeUserAuthToken();
  }
}
