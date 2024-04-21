// Model
const ParticipantModel = require("../../api/v1/participants/participantsModel");
const EventsModel = require("../../api/v1/events/eventsModel");
const OrdersModel = require("../../api/v1/orders/ordersModel");
// End Model

const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../../errors"); // Handle Error
const {
  createJWT,
  createTokenUser,
  createTokenParticipant,
} = require("../../utils");
const { otpMail } = require("../mail");

const signupParticipants = async (req) => {
  const { firstName, lastName, email, password, role } = req.body;

  //   JIka email dan statusnya Tidak aktif
  let result = await ParticipantModel.findOne({
    email,
    status: "tidak aktif",
  });

  if (result) {
    result.firstName = firstName;
    result.lastName = lastName;
    result.role = role;
    result.email = email;
    result.password = password;
    result.otp = Math.floor(Math.random() * 9999);
    await result.save();
  } else {
    result = await ParticipantModel.create({
      firstName,
      lastName,
      email,
      password,
      role,
      otp: Math.floor(Math.random() * 9999),
    });
  }
  await otpMail(email, result);

  delete result._doc.password;
  delete result._doc.otp;

  return result;
};

const activateParticipants = async (req) => {
  const { email, otp } = req.body;

  const check = await ParticipantModel.findOne({
    email,
  });

  if (!check) {
    throw new NotFoundError("Partisipan Belum Terdaftar");
  }

  if (check && check.otp !== otp) {
    throw new UnauthorizedError("Kode OTP Salah");
  }

  const result = await ParticipantModel.findByIdAndUpdate(
    check._id,
    {
      status: "aktif",
    },
    { new: true }
  );

  delete result._doc.password;

  return result;
};

const signinParticipants = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email dan Password harus diisi");
  }

  const result = await ParticipantModel.findOne({ email: email });

  if (!result) throw new UnauthorizedError("Invalid Credential");

  if (result.status === "tidak aktif")
    throw new UnauthorizedError("Akun anda Belum Aktif");

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) throw new UnauthorizedError("Invalid Credential");

  const token = createJWT({ payload: createTokenParticipant(result) });

  return token;
};

const getAllEvents = async (req) => {
  const result = await EventsModel.find({ statusEvent: "Published" })
    .populate("category")
    .populate("image")
    .select("_id title date tickets venueName");

  return result;
};

const getOneEvent = async (req) => {
  const { id } = req.params;

  const result = await EventsModel.findOne({ _id: id })
    .populate("category")
    .populate("talent")
    .populate("image");

  if (!result) throw new NotFoundError(`Tidak Ada Acara dengan Id ${id}`);

  return result;
};

const getAllOrders = async (req) => {
  const result = await OrdersModel.find({ participant: req.participant.id });

  return result;
};

module.exports = {
  signupParticipants,
  activateParticipants,
  signinParticipants,
  getAllEvents,
  getOneEvent,
  getAllOrders,
};
