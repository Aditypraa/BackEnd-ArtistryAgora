const router = require("express").Router();

const {
  create,
  index,
  find,
  update,
  destroy,
} = require("./categoriesController");

// Middleware Auth
const {
  authenticatedUser,
  authorizeRoles,
} = require("../../../middlewares/authMiddlewares");

// Router
router.get(
  "/categories",
  authenticatedUser,
  authorizeRoles("organizer"),
  index
);
router.get(
  "/categories/:id",
  authenticatedUser,
  authorizeRoles("organizer"),
  find
);
router.post(
  "/categories",
  authenticatedUser,
  authorizeRoles("organizer"),
  create
);
router.put(
  "/categories/:id",
  authenticatedUser,
  authorizeRoles("organizer"),
  update
);
router.delete(
  "/categories/:id",
  authenticatedUser,
  authorizeRoles("organizer"),
  destroy
);

module.exports = router;
