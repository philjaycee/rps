const { User } = require('../models')
const passport = require('../lib/passport')


module.exports = {
    login: passport.authenticate('local', {
        successRedirect: '/game',
        failureRedirect: '/login',
        failureFlash: true // Untuk mengaktifkan express flash
        })
}
