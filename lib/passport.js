const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../models')
const { Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt')


// authentication
async function authenticate(username, password, done) {
    try {

        const user = await User.authenticate({username, password})
        return done(null,user)
    }
    catch(err) {
        return done(null,false, {message:err})
    }
}

passport.use(
    new LocalStrategy({ usernameField: 'username', passwordField: 'password'}, authenticate)
)


passport.serializeUser(
    (user, done) => done(null, user.id)
)

passport.deserializeUser(
    async (id,done) => done(null, await User.findByPk(id))
)



/* Passport JWT Options*/

const options = {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),

    secretOrKey: 'Ini rahasia ga boleh disebar-sebar',
}

passport.use(new JwtStrategy(options, async (payload, done) => {
    User.findByPk(payload.id)
      .then(user => done(null,user))
      .catch(err=> done(err,false))
}))


module.exports = passport 
