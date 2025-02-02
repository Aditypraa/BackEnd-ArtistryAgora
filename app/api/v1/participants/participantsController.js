const { StatusCodes } = require('http-status-codes');
const {
  signupParticipants,
  activateParticipants,
  signinParticipants,
  getAllEvents,
  getOneEvent,
  getAllOrders,
  checkoutOrder,
  getAllPaymentsByOrganizer,
} = require('../../../services/mongoose/participantsMongoose');

const signup = async (req, res, next) => {
  try {
    const result = await signupParticipants(req);
    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const activateParticipant = async (req, res, next) => {
  try {
    const result = await activateParticipants(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const result = await signinParticipants(req);
    res.status(StatusCodes.OK).json({ data: { token: result } });
  } catch (err) {
    next(err);
  }
};

const getAllLandingPage = async (req, res, next) => {
  try {
    const result = await getAllEvents(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const getDetailLandingPage = async (req, res, next) => {
  try {
    const result = await getOneEvent(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const getAllPayments = async (req, res, next) => {
  try {
    const result = await getAllPaymentsByOrganizer(req);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const checkout = async (req, res, next) => {
  try {
    const result = await checkoutOrder(req);
    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, activateParticipant, signin, getAllLandingPage, getDetailLandingPage, getDashboard, checkout, getAllPayments };
