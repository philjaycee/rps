const router = require('express').Router()

const auth = require('../controllers/authControllers')

router.post('/login', auth.login)

module.exports = router;