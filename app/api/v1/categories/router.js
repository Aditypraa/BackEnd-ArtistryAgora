const { create, index, find } = require("./controller");

const router = require("express").Router();

router.get("/categories", index);
router.get("/categories/:id", find);
router.post("/categories", create);

module.exports = router;
