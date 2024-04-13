const { StatusCode } = require("http-status-codes");
const CustomApiError = require("./custom-api-error");

class NotFoundError extends CustomApiError {
  constructor(message) {
    super(message);

    // Memberikan status code not found
    this.statusCode = StatusCode.Not_Found;
  }
}

module.exports = NotFoundError;
