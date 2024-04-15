const router = require("express").Router();
const uploadMiddleware = require("../../../middlewares/multerMiddlewares");
const { create } = require("./imagesController");

router.post("/images", uploadMiddleware.single("avatar"), create);

module.exports = router;
