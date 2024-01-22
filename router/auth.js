const express = require("express");
const router = express.Router();
const authController = require('../controller/auth');
const uploadProfile = require("../controller/uploadProfile");

router.post('/signup',authController.signup)
router.post('/signin',authController.signin)
router.post('/uploadProfile', uploadProfile)

module.exports = router;