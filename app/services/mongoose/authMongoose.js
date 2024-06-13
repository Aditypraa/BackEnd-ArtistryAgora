const UsersModel = require('../../api/v1/users/usersModel');
const { createTokenUser, createJWT, createRefreshJWT } = require('../../utils');
// Import Custom Bad Request Error dan Custom Not Found Error
const { BadRequestError, UnauthorizedError } = require('../../errors');
const { createUserRefreshToken } = require('./userRefreshTokenMongoose');

const signin = async (req) => {
  const { email, password } = req.body;

  // check email & password from req.body
  if (!email || !password) throw new BadRequestError('Tolong masukkan email dan password.');

  // search email in database
  const result = await UsersModel.findOne({ email });

  // show error authorized, if not registered
  if (!result) throw new UnauthorizedError('Gagal melakukan proses autentikasi. Mohon untuk mengisi email & password dengan benar.');

  // compare password from input user with in database
  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) throw new UnauthorizedError('Gagal melakukan proses autentikasi. Mohon untuk mengisi email & password dengan benar.');

  // create token
  const token = createJWT({ payload: createTokenUser(result) });

  const refreshToken = createRefreshJWT({ payload: createTokenUser(result) });
  await createUserRefreshToken({
    refreshToken,
    user: result._id,
  });

  return { token, refreshToken, role: result.role, email: result.email };
};

module.exports = { signin };
