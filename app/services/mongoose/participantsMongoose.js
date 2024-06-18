// Model
const ParticipantModel = require('../../api/v1/participants/participantsModel');
const EventsModel = require('../../api/v1/events/eventsModel');
const OrdersModel = require('../../api/v1/orders/ordersModel');
const PaymentsModel = require('../../api/v1/payments/paymentsModel');
// End Model

const { BadRequestError, NotFoundError, UnauthorizedError } = require('../../errors'); // Handle Error
const { createJWT, createTokenParticipant } = require('../../utils');
const { otpMail } = require('../mail');

const signupParticipants = async (req) => {
  const { firstName, lastName, email, password, role } = req.body;

  //   JIka email dan statusnya Tidak aktif
  let result = await ParticipantModel.findOne({
    email,
    status: 'tidak aktif',
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

  // send code OTP to email participant
  await otpMail(email, result);

  delete result._doc.password;
  delete result._doc.otp;

  return result;
};

const activateParticipants = async (req) => {
  const { email, otp } = req.body;
  const check = await ParticipantModel.findOne({ email: email.toLowerCase() });

  if (!check) throw new NotFoundError('Email Belum Terdaftar');

  if (check && check.otp !== otp) throw new UnauthorizedError('Kode OTP Salah');

  const result = await ParticipantModel.findByIdAndUpdate({ _id: check._id }, { status: 'aktif' }, { new: true });

  delete result._doc.password;
  // delete result._doc.otp;

  return result;
};

const signinParticipants = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) throw new BadRequestError('Masukan Email dan Password');

  const result = await ParticipantModel.findOne({ email });

  if (!result) throw new UnauthorizedError('Email dan Password Tidak Valid!');

  if (result.status === 'tidak aktif') throw new UnauthorizedError('Akun anda Belum Terdaftar');

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) throw new UnauthorizedError('Email dan Password Tidak Valid!');

  const token = createJWT({ payload: createTokenParticipant(result) });

  return token;
};

const getAllEvents = async (req) => {
  const result = await EventsModel.find({ statusEvent: 'Published' }).populate('category').populate('image').select('_id title date tickets venueName');

  return result;
};

const getOneEvent = async (req) => {
  const { id } = req.params;

  const result = await EventsModel.findOne({ _id: id }).populate('category').populate({ path: 'talent', populate: 'image' }).populate('image');

  if (!result) throw new NotFoundError(`Tidak Ada Acara dengan Id ${id}`);

  return result;
};

const getAllOrders = async (req) => {
  const result = await OrdersModel.find({ participant: req.participant.id });

  return result;
};

const checkoutOrder = async (req) => {
  const { event, personalDetail, payment, tickets } = req.body;

  const checkingEvent = await EventsModel.findOne({ _id: event });

  if (!checkingEvent) throw new NotFoundError('Tidak ada acara dengan id : ' + event);

  const checkingPayment = await PaymentsModel.findOne({ _id: payment });

  if (!checkingPayment) throw new NotFoundError('Tidak ada metode pembayaran dengan id :' + payment);

  let totalPay = 0,
    totalOrderTicket = 0;

  await tickets.forEach((tic) => {
    checkingEvent.tickets.forEach((ticket) => {
      if (tic.ticketCategories.type === ticket.type) {
        if (tic.sumTicket > ticket.stock) {
          throw new NotFoundError('Stock event tidak mencukupi');
        } else {
          ticket.stock = ticket.stock -= tic.sumTicket;

          totalOrderTicket += tic.sumTicket;
          totalPay += tic.ticketCategories.price * tic.sumTicket;
        }
      }
    });
  });

  await checkingEvent.save();

  const historyEvent = {
    title: checkingEvent.title,
    date: checkingEvent.date,
    about: checkingEvent.about,
    tagline: checkingEvent.tagline,
    keyPoint: checkingEvent.keyPoint,
    venueName: checkingEvent.venueName,
    tickets: tickets,
    image: checkingEvent.image,
    category: checkingEvent.category,
    talent: checkingEvent.talent,
    organizer: checkingEvent.organizer,
  };

  const result = new OrdersModel({
    date: new Date(),
    personalDetail: personalDetail,
    totalPay,
    totalOrderTicket,
    orderItems: tickets,
    participant: req.participant.id,
    event,
    historyEvent,
    payment,
  });
  await result.save();

  // call Create Invoice Xendit
  // create payload
  let payload = {
    external_id: result._id.toString(),
    amount: totalPay,
    description: 'Invoice Demo #123',
    invoice_duration: 86400,
    customer: {
      given_names: personalDetail.firstName,
      surname: personalDetail.lastName,
      email: personalDetail.email,
      addresses: [
        {
          country: 'Indonesia',
        },
      ],
    },
    customer_notification_preference: {
      invoice_created: ['email'],
      invoice_reminder: ['email'],
      invoice_paid: ['email'],
    },
    // can be adjusted to the FE pages on desired
    success_redirect_url: 'https://www.google.com',
    failure_redirect_url: 'https://www.google.com',
    currency: 'IDR',
    items: [],
    metadata: {
      store_branch: 'Surabaya',
    },
  };

  for (const ticket of tickets) {
    payload.items.push({
      name: ticket.ticketCategories.type,
      quantity: ticket.sumTicket,
      price: ticket.ticketCategories.price,
      category: 'Ticket',
    });
  }
  // send to xendit
  // create api call to external api
  const base64Credentials = btoa(`${process.env.XENDIT_SECRET_KEY}:${''}`);
  // console.log('process.env.XENDIT_BASE_URL >>', process.env.XENDIT_BASE_URL);
  // console.log('process.env.XENDIT_SECRET_KEY >>', process.env.XENDIT_SECRET_KEY);
  let invoice;
  try {
    invoice = await fetch(`${process.env.XENDIT_BASE_URL}/v2/invoices`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64Credentials}`,
      },
    });
  } catch (error) {
    console.log('error on create invoice >>', error);
  }
  // console.log('here 222 >>');
  const resultInvoice = await invoice.json();

  // console.log('here 333 >>');
  // console.log(resultInvoice);

  return { result, invoice: resultInvoice };
};

const getAllPaymentsByOrganizer = async (req) => {
  const { organizer } = req.params;
  const result = await PaymentsModel.find({ organizer: organizer }).populate('image');

  return result;
};

module.exports = {
  signupParticipants,
  activateParticipants,
  signinParticipants,
  getAllEvents,
  getOneEvent,
  getAllOrders,
  checkoutOrder,
  getAllPaymentsByOrganizer,
};
