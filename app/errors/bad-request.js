const { StatusCode } = require("http-status-codes");
const CustomApiError = require("./custom-api-error");

class BadRequestError extends CustomApiError {
  constructor(message) {
    super(message);

    // Memberikan status code bad Request
    this.statusCode = StatusCode.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
