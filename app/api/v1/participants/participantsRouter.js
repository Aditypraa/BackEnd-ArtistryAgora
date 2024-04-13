const router = require("express").Router();

router.get("/participants", (req, res) => {
  res.status(200).json({
    message: "Halaman participants",
  });
});

module.exports = router;
