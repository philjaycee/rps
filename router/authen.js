const router = require('express').Router()

const auth = require('../controllers/authenControllers')

router.get('/login', auth.loginGet)

router.post('/login', auth.loginPost)

module.exports = router;