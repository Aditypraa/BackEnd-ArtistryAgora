const UsersModel = require('../../api/v1/users/usersModel');
const OrganizersModel = require('../../api/v1/organizers/organizersModel');
// Handling Error
const { BadRequestError, NotFoundError } = require('../../errors');

// Organizers
const getAllOrganizers = async () => {
  const result = await UsersModel.find({ role: 'organizer' }).populate({ path: 'organizer', select: 'organizer' }).select(' name email role');

  return result;
};

const getOrganizerById = async (req) => {
  const { id } = req.params;
  const organizer = await UsersModel.findById(id);

  if (!organizer) {
    throw new NotFoundError('Organizer tidak ditemukan');
  }

  return organizer;
};

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

const updateOrganizer = async (req) => {
  const { id } = req.params;
  const { organizer, role, email, password, confirmPassword, name } = req.body;

  const updatedOrganizer = await UsersModel.findByIdAndUpdate(
    id,
    { name, email, password, confirmPassword, role, organizer },
    { new: true, runValidators: true },
  );

  if (!updatedOrganizer) {
    throw new NotFoundError('Organizer tidak ditemukan');
  }

  return updatedOrganizer;
};

const deleteOrganizer = async (req) => {
  const { id } = req.params;

  const organizer = await OrganizersModel.findByIdAndDelete(id);

  if (!organizer) {
    throw new NotFoundError('Organizer tidak ditemukan');
  }

  // Also delete all users associated with this organizer
  await UsersModel.deleteMany({ organizer: id });

  return organizer;
};
// End Organizers

// Users/Admin
const getAllUsers = async (req) => {
  const organizerId = req.user.organizer;
  const result = await UsersModel.find({ organizer: organizerId, role: 'admin' });

  return result;
};

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

const getUserById = async (req) => {
  const { id } = req.params;
  const user = await UsersModel.findById(id);

  if (!user) {
    throw new NotFoundError('User tidak ditemukan');
  }

  return user;
};

const updateUser = async (req) => {
  const { id } = req.params;
  const { name, password, role, confirmPassword, email } = req.body;

  const user = await UsersModel.findByIdAndUpdate(id, { name, email, password, confirmPassword, role }, { new: true, runValidators: true });

  if (!user) {
    throw new NotFoundError('User tidak ditemukan');
  }

  return user;
};

const deleteUser = async (req) => {
  const { id } = req.params;

  const user = await UsersModel.findByIdAndDelete(id);

  if (!user) {
    throw new NotFoundError('User tidak ditemukan');
  }

  return user;
};
// End Users/Admin

module.exports = {
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
};
