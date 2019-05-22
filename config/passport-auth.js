const Stylist = require('../models/Stylist');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config/config');

module.exports = function (passport){
    let options = {}
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('Bearer');
    options.secretOrKey = config.secret;
    passport.use(
        new JwtStrategy(options, (jwt_payload, done) => {
            // look up the user
            Stylist.findById(jwt_payload.user._id, function(err, user) {
                if (err) return done(err, false);
                if (user) return done(null, user);
                return done(null, false);
           });
        })
    );
};

