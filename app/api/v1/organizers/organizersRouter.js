const router = require("express").Router();

const {
  getCMSUsers,
  createCMSOrganizer,
  createCMSUsers,
} = require("./organizersController");

// Middleware
const {
  authenticatedUser,
  authorizeRoles,
} = require("../../../middlewares/authMiddlewares");

router.get("/users", authenticatedUser, authorizeRoles("owner"), getCMSUsers);

router.post(
  "/organizers",
  authenticatedUser,
  authorizeRoles("owner"),
  createCMSOrganizer
);
router.post(
  "/users",
  authenticatedUser,
  authorizeRoles("organizer"),
  createCMSUsers
);

module.exports = router;
