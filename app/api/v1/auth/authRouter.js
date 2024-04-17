const { signinCMS } = require("./authController");

const router = require("express").Router();

router.post("/signin", signinCMS);

module.exports = router;
