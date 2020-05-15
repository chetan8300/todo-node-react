const router = require('express').Router();
const controller = require("../controllers/auth.controller");

const { checkDuplicateEmail } = require("../middlewares/verifySignUp");
const verifyToken = require('./../middlewares/verifyToken');

router.post('/register', [checkDuplicateEmail], controller.signup)

router.post('/login', controller.signin)

router.post('/change-password', [verifyToken], controller.changepassword)

module.exports = router; 