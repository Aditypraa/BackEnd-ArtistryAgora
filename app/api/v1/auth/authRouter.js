const router = require("express").Router();

router.get("/auth", (req, res) => {
  res.status(200).json({
    message: "Halaman auth",
  });
});

module.exports = router;
