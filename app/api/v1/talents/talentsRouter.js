const router = require("express").Router();

const { index, find, update, create, destroy } = require("./talentsController");

router.get("/talents", index);
router.get("/talents/:id", find);
router.post("/talents", create);
router.put("/talents/:id", update);
router.delete("/talents/:id", destroy);

module.exports = router;
