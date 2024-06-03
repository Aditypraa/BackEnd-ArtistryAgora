const { StatusCodes } = require('http-status-codes');
const CustomApiError = require('./customApiError');

class NotFoundError extends CustomApiError {
  constructor(message) {
    super(message);
    // Memberikan status code not found
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
