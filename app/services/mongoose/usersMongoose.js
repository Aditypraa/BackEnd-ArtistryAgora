const UsersModel = require('../../api/v1/users/usersModel');
const OrganizersModel = require('../../api/v1/organizers/organizersModel');
// Handeling Error
const { BadRequestError } = require('../../errors');

// Create Organizer
const createOrganizer = async (req) => {
  const { organizer, role, email, password, confirmPassword, name } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password dan confirmPassword tidak sama');
  }

  const result = await OrganizersModel.create({ organizer });

  const users = await UsersModel.create({
    email,
    name,
    password,
    organizer: result._id,
    role,
  });

  delete users._doc.password;

  return users;
};
//End Create Organizer

// users
const createUsers = async (req) => {
  const { name, password, role, confirmPassword, email } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password dan confirmPassword tidak sama');
  }

  const result = await UsersModel.create({
    name,
    email,
    organizer: req.user.organizer,
    password,
    role,
  });

  return result;
};

const getAllUsers = async (req) => {
  const result = await UsersModel.find();

  return result;
};
// End Users

module.exports = { createOrganizer, createUsers, getAllUsers };
