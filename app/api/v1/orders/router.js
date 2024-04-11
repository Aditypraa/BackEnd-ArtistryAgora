const router = require("express").Router();

router.get("/orders", (req, res) => {
  res.status(200).json({
    message: "Halaman orders",
  });
});

module.exports = router;
