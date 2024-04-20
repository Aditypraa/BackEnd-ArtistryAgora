const EventsModel = require("../../api/v1/events/eventsModel");
const { checkingImage } = require("./imagesMongoose");
const { checkingTalent } = require("./talentsMongoose");
const { checkingCategories } = require("./categoriesMongoose");

// Import Custom Bad Request Error dan Custom Not Found Error
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllEvents = async (req) => {
  const { keyword, category, talent, status } = req.query;
  let condition = { organizer: req.user.organizer };

  if (keyword) {
    condition = {
      ...condition,
      title: { $regex: keyword, $options: "i" },
    };
  }

  if (category) {
    condition = { ...condition, category: category };
  }

  if (talent) {
    condition = { ...condition, talent: talent };
  }

  if (["Draft", "Published"].includes(status)) {
    condition = { ...condition, statusEvent: status };
  }

  const result = await EventsModel.find(condition)
    .populate({
      path: "image",
      select: "_id name",
    })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id name" },
    });

  return result;
};

const createEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  //   Cari image, category, talent dengan field ID
  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalent(talent);

  // Cari event Dengan Field Name
  const check = await EventsModel.findOne({ title });

  // Apabila check true / data event sudah ada maka kita tampilkan error bad request dengan message event nama duplikat
  if (check) throw new BadRequestError("Judul Event Sudah Terdaftar");

  const result = await EventsModel.create({
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
    organizer: req.user.organizer,
  });

  return result;
};

const getOneEvents = async (req) => {
  const { id } = req.params;

  const result = await EventsModel.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({
      path: "image",
      select: "_id name",
    })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id name" },
    });

  if (!result) throw new NotFoundError(`Tidak Ada Acara dengan ID : ${id}`);

  return result;
};

const updateEvents = async (req) => {
  const { id } = req.params;
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  // Cari image, category, talent dengan field ID
  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalent(talent);

  // cari event berdasarkan field Id
  const checkEvent = await EventsModel.findOne({ _id: id });

  // JIka false / null maka akan menampilkan error " Tidak Ada Acara dengan ID : ${id} "
  if (!checkEvent)
    throw new NotFoundError(`Tidak ada Event dengan id :  ${id}`);

  // Cari event Dengan Field Name dan Id selain dari yang dikirim dari params
  const check = await EventsModel.findOne({
    title,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  // Apabila check true / data event sudah ada maka kita tampilkan error bad request dengan message event nama duplikat
  if (check) throw new BadRequestError("Judul Event Sudah Terdaftar");

  const result = await EventsModel.findOneAndUpdate(
    { _id: id },
    {
      title,
      date,
      about,
      tagline,
      venueName,
      keyPoint,
      statusEvent,
      tickets,
      image,
      category,
      talent,
      organizer: req.user.organizer,
    },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteEvents = async (req) => {
  const { id } = req.params;

  const result = await EventsModel.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result)
    throw new NotFoundError(`Tidak ada Pembicara dengan id :  ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

const changeStatusEvents = async (req) => {
  const { id } = req.params;
  const { statusEvent } = req.body;

  if (!["Draft", "Published"].includes(statusEvent))
    throw new BadRequestError("Status Event harus Draft atau Published");

  // Cari event berdasarkan field id
  const checkEvent = await EventsModel.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  // Jika id result false/ null  maka akan menampilkan error "Tidak ada acara dengan id" yang dikirim oleh client
  if (!checkEvent) throw new Error(`Tidak ada acara dengan id : ${id}`);

  checkEvent.statusEvent = statusEvent;

  await checkEvent.save();

  return checkEvent;
};

module.exports = {
  getAllEvents,
  createEvents,
  getOneEvents,
  updateEvents,
  deleteEvents,
  changeStatusEvents,
};
