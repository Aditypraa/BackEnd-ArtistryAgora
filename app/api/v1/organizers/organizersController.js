const { StatusCodes } = require('http-status-codes');
const { createOrganizer, createUsers, getAllUsers } = require('../../../services/mongoose/usersMongoose');

const getCMSUsers = async (req, res, next) => {
  try {
    const result = await getAllUsers(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const createCMSOrganizer = async (req, res, next) => {
  try {
    const result = await createOrganizer(req);
    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create Users Ini adalah admin
const createCMSUsers = async (req, res, next) => {
  try {
    const result = await createUsers(req);
    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { createCMSOrganizer, createCMSUsers, getCMSUsers };
