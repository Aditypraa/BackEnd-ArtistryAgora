const PaymentsModel = require('../../api/v1/payments/paymentsModel');
const { checkingImage } = require('./imagesMongoose');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllPayments = async (req) => {
  let condition = { organizer: req.user.organizer };

  const result = await PaymentsModel.find(condition)
    .populate({
      path: 'image',
      select: '_id name',
    })
    .select('_id type image status');

  return result;
};

const createPayments = async (req) => {
  const { type, image } = req.body;

  await checkingImage(image);

  const check = await PaymentsModel.findOne({
    type,
    organizer: req.user.organizer,
  });

  if (check) {
    throw new BadRequestError('Tipe Pembayaran Sudah Ada');
  }

  const result = await PaymentsModel.create({
    image,
    type,
    organizer: req.user.organizer,
  });

  return result;
};

const getOnePayments = async (req) => {
  const { id } = req.params;

  const result = await PaymentsModel.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({
      path: 'image',
      select: '_id name',
    })
    .select('_id type image status');

  if (!result) {
    throw new NotFoundError(`Tidak ada tipe pembayaran dengan id ${id}`);
  }

  return result;
};

const updatePayments = async (req) => {
  const { id } = req.params;
  const { type, image } = req.body;

  await checkingImage(image);

  const check = await PaymentsModel.findOne({
    type,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError('Tipe Pembayaran Sudah Ada');

  const result = await PaymentsModel.findOneAndUpdate({ _id: id }, { type, image, organizer: req.user.organizer }, { new: true, runValidators: true });

  if (!result) throw new NotFoundError(`Tidak ada tipe pembayaran dengan id ${id}`);

  return result;
};

const deletePayments = async (req) => {
  const { id } = req.params;

  const result = await PaymentsModel.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) throw new NotFoundError(`Tidak ada tipe pembayaran dengan id ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

const checkingPayments = async (id) => {
  const result = await PaymentsModel.findOne({ _id });

  if (!result) throw new NotFoundError(`Tidak ada tipe pembayaran dengan id ${id}`);

  return result;
};

module.exports = { getAllPayments, createPayments, getOnePayments, updatePayments, deletePayments, checkingPayments };
