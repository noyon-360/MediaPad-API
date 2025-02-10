
const router = require('express').Router();

const { register, login } = require('../Controller/UserAuthContoller');
const { loginValidation, userRegisterValidation } = require('../Middlewares/AuthValidation');
const ensureAuthenticated = require('../Middlewares/Authentication');

router.post("/checkValidation", ensureAuthenticated)

router.post('/login', loginValidation, login);

router.post('/register', userRegisterValidation, register);

module.exports = router;