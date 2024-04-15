const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./customApiError");

class BadRequestError extends CustomApiError {
  constructor(message) {
    super(message);

    // Memberikan status code bad Request
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
