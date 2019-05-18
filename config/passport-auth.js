const Stylist = require('../models/Stylist');
const LocalStrategy = require('passport-local').Strategy;
const Helpers = require('../helpers/helpers');
const jwt = require('jsonwebtoken');

module.exports = function (passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) =>{
            // lookup user
            Stylist.findOne({'details.email': email})
            .then(user => {
                const isPasswordMatch = Helpers.encryptPassword(password);
                if(isPasswordMatch === user.details.password){
                    // generate token
                    const token = jwt.sign({user}, 'secret');
                    console.log(token)
                    return done(null, user);
                }
                return done(null, false, {message: 'Incorrect Password'});
            })
            .catch(err => {
                return done(null, false, {message: 'Username not registered. No such user exists'});
            });
        })
    )
    passport.serializeUser((user, done) =>{
        return done(null, user.id);
    });
    
    passport.deserializeUser((id, done) =>{
        Stylist.findById(id, (err, user) => {
            done(err, user)
        });
    });

}

