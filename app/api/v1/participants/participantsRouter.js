const router = require("express").Router();
const {
  signup,
  activateParticipant,
  signin,
  getAllLandingPage,
  getDetailLandingPage,
  getDashboard,
} = require("./participantsController");

const {
  authenticatedParticipant,
} = require("../../../middlewares/authMiddlewares");

router.post("/auth/signup", signup);
router.put("/active", activateParticipant);
router.post("/auth/signin", signin);
router.get("/events", getAllLandingPage);
router.get("/events/:id", getDetailLandingPage);
router.get("/orders", authenticatedParticipant, getDashboard);

module.exports = router;
