const { signinCMS } = require("./authController");

const router = require("express").Router();

router.post("/auth/signin", signinCMS);

module.exports = router;
