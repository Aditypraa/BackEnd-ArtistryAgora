const UsersModel = require("../../api/v1/users/usersModel");
const { createTokenUser, createJWT, createRefreshJWT } = require("../../utils");

// Import Custom Bad Request Error dan Custom Not Found Error
const { BadRequestError, UnauthorizedError } = require("../../errors");
const { createUserRefreshToken } = require("./userRefreshTokenMongoose");

const signin = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const result = await UsersModel.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Credentials");
  }
  const token = createJWT({ payload: createTokenUser(result) });

  const refreshToken = createRefreshJWT({ payload: createTokenUser(result) });
  await createUserRefreshToken({
    refreshToken,
    user: result._id,
  });

  return { token, refreshToken, role: result.role, email: result.email };
};

module.exports = { signin };
