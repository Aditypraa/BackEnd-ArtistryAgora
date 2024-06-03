const { StatusCodes } = require('http-status-codes');
const {
  createOrganizer,
  createUsers,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllOrganizers,
  getOrganizerById,
  updateOrganizer,
  deleteOrganizer,
} = require('../../../services/mongoose/usersMongoose');

// Organizers
const getCMSOrganizers = async (req, res, next) => {
  try {
    const result = await getAllOrganizers();
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

const getCMSOrganizerById = async (req, res, next) => {
  try {
    const result = await getOrganizerById(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const updateCMSOrganizer = async (req, res, next) => {
  try {
    const result = await updateOrganizer(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const deleteCMSOrganizer = async (req, res, next) => {
  try {
    const result = await deleteOrganizer(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create Users Admin
const getCMSUsers = async (req, res, next) => {
  try {
    const result = await getAllUsers(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const createCMSUsers = async (req, res, next) => {
  try {
    const result = await createUsers(req);
    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const getCMSUserById = async (req, res, next) => {
  try {
    const result = await getUserById(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const updateCMSUser = async (req, res, next) => {
  try {
    const result = await updateUser(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const deleteCMSUser = async (req, res, next) => {
  try {
    const result = await deleteUser(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCMSOrganizer,
  createCMSUsers,
  getCMSUsers,
  getCMSUserById,
  updateCMSUser,
  deleteCMSUser,
  getCMSOrganizers,
  getCMSOrganizerById,
  updateCMSOrganizer,
  deleteCMSOrganizer,
};
