const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  // urlDb: process.env.URL_MONGODB_DEV,
  urlDb: process.env.URL_MONGODB_PROD,
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtRefreshTokenExpiration: process.env.JWT_EXPIRATION_REFRESH_TOKEN,
  jwtRefreshTokenSecret: process.env.JWT_SECRET_KEY_REFRESH_TOKEN,
  gmail: process.env.GMAIL,
  password: process.env.PASSWORD,
};
