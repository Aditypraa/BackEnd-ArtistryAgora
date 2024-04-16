const { index, find, create, update, destroy } = require("./eventsController");

const router = require("express").Router();

router.get("/events", index);
router.get("/events/:id", find);
router.post("/events", create);
router.put("/events/:id", update);
router.delete("/events/:id", destroy);

module.exports = router;
