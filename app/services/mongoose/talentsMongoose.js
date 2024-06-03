const TalentModel = require('../../api/v1/talents/talentsModel');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkingImage } = require('./imagesMongoose');

const getAllTalents = async (req) => {
  const { keyword } = req.query;

  let condition = { organizer: req.user.organizer };

  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: 'i' } };
  }

  const result = await TalentModel.find(condition)
    .populate({
      path: 'image',
      select: '_id name',
    })
    .select('_id name role image');

  return result;
};

const createTalent = async (req) => {
  const { name, role, image } = req.body;

  // mencari Image dengan field image
  await checkingImage(image);

  // Mencari Talents dengan field Name
  const check = await TalentModel.findOne({
    name,
    organizer: req.user.organizer,
  });

  // apa bila check true / data talents sudah ada maka kita tampilkan error bad request dengan message pembicara sudah terdaftar
  if (check) throw new BadRequestError('pembicara sudah terdaftar');

  const result = await TalentModel.create({
    name,
    image,
    role,
    organizer: req.user.organizer,
  });

  return result;
};

const getOneTalent = async (req) => {
  const { id } = req.params;

  const result = await TalentModel.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({
      path: 'image',
      select: '_id name',
    })
    .select('_id name role image');

  if (!result) throw new NotFoundError(`Tidak ada Pembicara dengan ID : ${id}`);

  return result;
};

const updateTalents = async (req) => {
  const { id } = req.params;
  const { name, role, image } = req.body;

  // mencari Image dengan field image
  await checkingImage(image);

  // Mencari Talents dengan field Name dan id selain dari yang dikirim oleh params
  const check = await TalentModel.findOne({
    name,
    _id: { $ne: id },
    organizer: req.user.organizer,
  });

  // apa bila check true / data talents sudah ada maka kita tampilkan error bad request dengan message pembicara sudah terdaftar
  if (check) throw new BadRequestError('pembicara sudah terdaftar');

  const result = await TalentModel.findOneAndUpdate({ _id: id }, { name, image, role, organizer: req.user.organizer }, { new: true, runValidators: true });

  // apa bila result false / data talents tidak ada maka kita tampilkan error not found dengan message tidak ada pembicara dengan id yang dikirim
  if (!result) throw new NotFoundError(`Tidak ada Pembicara dengan ID : ${id}`);

  return result;
};

const deleteTalents = async (req) => {
  const { id } = req.params;

  const result = await TalentModel.findOneAndDelete({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) throw new NotFoundError(`Tidak ada Pembicara dengan ID : ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

const checkingTalent = async (id) => {
  const result = await TalentModel.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada Pembicara dengan ID : ${id}`);

  return result;
};

module.exports = {
  getAllTalents,
  createTalent,
  getOneTalent,
  updateTalents,
  deleteTalents,
  checkingTalent,
};
