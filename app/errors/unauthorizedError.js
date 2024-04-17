const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./customApiError");

class UnauthorizedError extends CustomApiError {
  constructor(message) {
    super(message);

    // Memberikan status code forbidden
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnauthorizedError;
