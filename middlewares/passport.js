const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt

const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

module.exports = function (passport) {
  passport.use(
    new jwtStrategy(options, async (payload, done) => {
      try {
        if (payload.userId) {
          return done(null, payload.userId)
        } else {
          return done(null, false)
        }
      } catch (e) {
        console.log(e)
      }
    })
  )
}
