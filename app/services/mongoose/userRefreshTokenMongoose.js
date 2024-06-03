const UserRefreshTokenModel = require('../../api/v1/userRefreshToken/userRefreshTokenModel');
const { isTokenValidRefreshToken, createJWT, createTokenUser } = require('../../utils');
const Users = require('../../api/v1/users/usersModel');
const { NotFoundError } = require('../../errors');

const createUserRefreshToken = async (payload) => {
  const result = await UserRefreshTokenModel.create(payload);

  return result;
};

const getUserRefreshToken = async (req) => {
  const { refreshToken } = req.params;
  const result = await UserRefreshTokenModel.findOne({
    refreshToken,
  });

  if (!result) throw new NotFoundError(`refreshToken tidak valid `);

  const payload = isTokenValidRefreshToken({ token: result.refreshToken });

  const userCheck = await Users.findOne({ email: payload.email });

  const token = createJWT({ payload: createTokenUser(userCheck) });

  return token;
};

module.exports = { createUserRefreshToken, getUserRefreshToken };
