const router = require("express").Router();

router.get("/payments", (req, res) => {
  res.status(200).json({
    message: "Halaman payments",
  });
});

module.exports = router;
