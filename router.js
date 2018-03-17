const router = require('express').Router()
const { authBasic, register } = require('./app/controller/auth')

router.post('/basicAuth', authBasic);
router.post('/register', register);

module.exports = router