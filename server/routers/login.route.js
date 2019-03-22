const router = require('express').Router();
const loginCtrl = require('../controllers/login.control');

router
.route('/register')
.post(loginCtrl.register);//loginCtrl.authCheck,

router
.route('/login')
.post(loginCtrl.loginUser);

module.exports = router;