const router = require('express').Router();
const { signinCMS } = require('./authController');

router.post('/auth/signin', signinCMS);

module.exports = router;
