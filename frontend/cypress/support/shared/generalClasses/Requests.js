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
  DELETE: "DELETE",
};

const URL = {
  registerUser: "http://localhost:4001/user/register",
  clearData: "http://localhost:4001/clear-data",
};

export class Requests {
  // method, url, body, statusCode
  static apiUserSignup(body) {
    TestingTool.postUser(
      HTTP_METHODS.POST,
      URL.registerUser,
      body,
      STATUS_CODES.OK
    );
  }

  static apiClearData(body) {
    TestingTool.clearData(HTTP_METHODS.DELETE, URL.clearData, STATUS_CODES.OK);
  }
}
