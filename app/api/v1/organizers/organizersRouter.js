const router = require("express").Router();

const {
  createCMSOrganizer,
  createCMSUsers,
} = require("./organizersController");

// Middleware
const {
  authenticatedUser,
  authorizeRoles,
} = require("../../../middlewares/authMiddlewares");

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
