const router = require("express").Router();

router.get("/tickets", (req, res) => {
  res.status(200).json({
    message: "Halaman Tickets",
  });
});

module.exports = router;
