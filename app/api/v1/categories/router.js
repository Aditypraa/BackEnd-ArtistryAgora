const router = require("express").Router();

router.get("/categories", (req, res) => {
  res.status(200).json({
    message: "Halaman Categories",
  });
});

module.exports = router;
