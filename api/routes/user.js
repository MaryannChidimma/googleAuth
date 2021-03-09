require('express-async-errors');
const router = require("express").Router();
const userRoute = require("../controllers/user");
const checkAuth = require('../middleware/userAuth');

router.post('/signup', userRoute.signup);
router.post('/login', userRoute.login);
router.post('/mailer', userRoute.mailer);
router.delete('/:userId', checkAuth, userRoute.delete);


module.exports = router