const router = require("express").Router();

router.get("/images", (req, res) => {
  res.status(200).json({
    message: "Halaman Images",
  });
});

module.exports = router;
