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

router.post("/organizers", createCMSOrganizer);
router.post("/users", authenticatedUser, createCMSUsers);

module.exports = router;
