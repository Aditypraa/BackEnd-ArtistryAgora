const ImagesModel = require("../../api/v1/images/imagesModel");

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

module.exports = { generateUrlImage, createImages };
