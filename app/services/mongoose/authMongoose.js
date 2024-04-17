const UsersModel = require("../../api/v1/users/usersModel");
const { createTokenUser, createJWT } = require("../../utils");

// Import Custom Bad Request Error dan Custom Not Found Error
const { BadRequestError, UnauthorizedError } = require("../../errors");

const signin = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const result = await UsersModel.findOne({ email });

  if (!result) {
    throw new UnauthorizedError("Invalid Credential");
  }

  const isPasswordCorrect = await result.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Credential");
  }

  const token = createJWT({ payload: createTokenUser(result) });

  return token;
};

module.exports = { signin };
