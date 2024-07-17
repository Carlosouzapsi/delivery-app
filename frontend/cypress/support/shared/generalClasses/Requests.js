import { TestingTool } from "../../TestingTool/TestingTool";

const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

const HTTP_METHODS = {
  POST: "POST",
  PATCH: "PATCH",
  GET: "GET",
};

export class Requests {
  static apiUserSignup(url, body, statusCode) {
    TestingTool.postUser(HTTP_METHODS.POST, url, body, STATUS_CODES.OK);
  }
}
