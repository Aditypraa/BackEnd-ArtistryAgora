const { createCMSOrganizer } = require("./organizersController");

const router = require("express").Router();

router.post("/organizers", createCMSOrganizer);

module.exports = router;
