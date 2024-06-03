const { StatusCodes } = require('http-status-codes');
const { signin } = require('../../../services/mongoose/authMongoose');

const signinCMS = async (req, res, next) => {
  try {
    const result = await signin(req);
    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { signinCMS };
