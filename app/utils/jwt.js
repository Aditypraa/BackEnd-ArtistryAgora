const jwt = require('jsonwebtoken');
const { jwtExpiration, jwtSecret, jwtRefreshTokenSecret, jwtRefreshTokenExpiration } = require('../config/mongoConfig');

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });

  return token;
};
const createRefreshJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtRefreshTokenSecret, {
    expiresIn: jwtRefreshTokenExpiration,
  });

  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);

const isTokenValidRefreshToken = ({ token }) => jwt.verify(token, jwtRefreshTokenSecret);

module.exports = {
  createJWT,
  isTokenValid,
  createRefreshJWT,
  isTokenValidRefreshToken,
};
