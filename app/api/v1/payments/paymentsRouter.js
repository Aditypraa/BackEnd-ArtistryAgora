const router = require("express").Router();

const {
  index,
  create,
  find,
  update,
  destroy,
} = require("./paymentsController");

// Middleware
const {
  authenticatedUser,
  authorizeRoles,
} = require("../../../middlewares/authMiddlewares");

router.get("/payments", authenticatedUser, authorizeRoles("organizer"), index);
router.get(
  "/payments/:id",
  authenticatedUser,
  authorizeRoles("organizer"),
  find
);
router.put(
  "/payments/:id",
  authenticatedUser,
  authorizeRoles("organizer"),
  update
);
router.delete(
  "/payments/:id",
  authenticatedUser,
  authorizeRoles("organizer"),
  destroy
);
router.post(
  "/payments",
  authenticatedUser,
  authorizeRoles("organizer"),
  create
);

module.exports = router;
