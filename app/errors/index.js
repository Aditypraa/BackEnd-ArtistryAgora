const BadRequestError = require("./_badRequestError");
const CustomApiError = require("./customApiError");
const NotFoundError = require("./_notFoundError");
const UnauthenticatedError = require("./unauthenticatedError");
const UnauthorizedError = require("./unauthorizedError");

module.exports = {
  CustomApiError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
};
