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
  const organizer = await UsersModel.findById(id).populate({ path: 'organizer', select: 'organizer' });

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
    confirmPassword,
    organizer: result._id,
    role,
  });

  delete users._doc.password;

  return users;
};

const updateOrganizer = async (req) => {
  const { id } = req.params;
  const { organizer, role, email, password, confirmPassword, name } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Passwords dan confirmPassword tidak sama');
  }

  // Find user by ID to get the organizer ID
  const user = await UsersModel.findById(id);
  if (!user) {
    throw new NotFoundError('User tidak ditemukan');
  }

  // Update the organizer
  const organizerResult = await OrganizersModel.findByIdAndUpdate(user.organizer, { organizer }, { new: true, runValidators: true });

  if (!organizerResult) {
    throw new NotFoundError('Organizer tidak ditemukan');
  }

  // Update the user
  const userResult = await UsersModel.findByIdAndUpdate(
    id,
    {
      role,
      email,
      password,
      confirmPassword,
      name,
      organizer: organizerResult._id,
    },
    { new: true, runValidators: true },
  );

  if (!userResult) {
    throw new NotFoundError('User tidak ditemukan');
  }

  return userResult;
};

const deleteOrganizer = async (req) => {
  const { id } = req.params;

  // Cari pengguna berdasarkan id
  const user = await UsersModel.findById(id);

  if (!user) {
    throw new NotFoundError('User tidak ditemukan');
  }

  // Dapatkan id dari penyelenggara
  const organizerId = user.organizer;

  // Hapus penyelenggara berdasarkan id dari penyelenggara
  const organizer = await OrganizersModel.findByIdAndDelete(organizerId);

  if (!organizer) {
    throw new NotFoundError('Organizer tidak ditemukan');
  }

  // Hapus pengguna berdasarkan id
  await UsersModel.findByIdAndDelete(id);

  return organizer;
};
// End Organizers

// Users/Admin
const getAllUsers = async (req) => {
  const organizerId = req.user.organizer;
  const result = await UsersModel.find({ organizer: organizerId, role: 'admin' }).select('name email role');

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
