const { StatusCodes } = require('http-status-codes');
const CustomApiError = require('./customApiError');

class UnauthenticatedError extends CustomApiError {
  constructor(message) {
    super(message);

    // Memberikan status code unauthorized
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
