const CategoriesModel = require("./categoriesModel");

const index = async (req, res, next) => {
  try {
    const result = await CategoriesModel.find().select("_id name");
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await CategoriesModel.findOne({ _id: id });

    if (!result) {
      return res.status(404).json({
        message: "Id Categories Tidak Ditemukan",
      });
    }

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await CategoriesModel.create({ name });
    res.status(201).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await CategoriesModel.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({
        message: "Id Categories Tidak Ditemukan",
      });
    }

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await CategoriesModel.findByIdAndDelete(id);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  index,
  find,
  update,
  destroy,
};
