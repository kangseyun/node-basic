const router = require('express').Router()
const { authBasic } = require('./app/controller/auth')

router.get('/basicAuth', authBasic);

module.exports = router