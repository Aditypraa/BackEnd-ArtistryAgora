const router = require("express").Router();

const { index } = require("./ordersController");

// Middleware
// Middleware
const {
  authenticatedUser,
  authorizeRoles,
} = require("../../../middlewares/authMiddlewares");

router.get(
  "/orders",
  authenticatedUser,
  authorizeRoles("organizer", "admin", "owner"),
  index
);

module.exports = router;
