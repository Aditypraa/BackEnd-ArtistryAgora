const ImagesModel = require("../../api/v1/images/imagesModel");
const { NotFoundError } = require("../../errors");

// Generetae url setelah submit baru simpan image
const generateUrlImage = async (req) => {
  const result = `uploads/${req.file.filename}`;

  return result;
};

const createImages = async (req) => {
  const result = await ImagesModel.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : "uploads/avatar/default.png",
  });

  return result;
};

const checkingImage = async (id) => {
  const result = await ImagesModel.findOne({ _id: id });
  console.log(result);

  if (!result) throw new NotFoundError(`Tidak ada Gambar dengan ID : ${id}`);

  return result;
};

module.exports = { generateUrlImage, createImages, checkingImage };
