const router = require("express").Router();

router.get("/events", (req, res) => {
  res.status(200).json({
    message: "Halaman Events",
  });
});

module.exports = router;
