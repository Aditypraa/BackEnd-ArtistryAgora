const router = require("express").Router();
const { index, find, create, update, destroy } = require("./eventsController");

// Middleware Auth
const {
  authenticatedUser,
  authorizeRoles,
} = require("../../../middlewares/authMiddlewares");

router.get("/events", authenticatedUser, authorizeRoles("organizer"), index);
router.get("/events/:id", authenticatedUser, authorizeRoles("organizer"), find);
router.post("/events", authenticatedUser, authorizeRoles("organizer"), create);
router.put(
  "/events/:id",
  authenticatedUser,
  authorizeRoles("organizer"),
  update
);
router.delete(
  "/events/:id",
  authenticatedUser,
  authorizeRoles("organizer"),
  destroy
);

module.exports = router;
