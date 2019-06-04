const express = require('express');
const router = express.Router();
const Helpers = require('../helpers/helpers');
const passport = require('passport');
const Stylist = require('../models/Stylist');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

// register new users
router.post('/register', (req, res) => {
  // validate user input details
  Helpers.validateInput(req.body, {abortEarly: true}).validate(req.body, (err, user) => {
    if(err) return res.status(400).send(err.message);
    // encrypt password
    const encrypted = Helpers.encryptPassword(user.password);
    if(!encrypted) return res.status(500).send({success: false, msg: `${JSON.stringify(res.sendStatus(500))}`});
    // create new user 
    const stylist = new Stylist({
      details: {
        name: user.name,
        email: user.email,
        username: user.username,
        password: encrypted,
        // passwordConfirmation: encrypted
      }
    });
    // persist new user to database 
    stylist.save((err, success) =>{
      if(err) {
        err.code === 11000 ? err.message = `Email already in use` : err.message = null;
        return res.status(400).send({success: false, msg: err.message});
      }
      res.status(200).send({success: true, msg: 'Registration successful'});
    });
  }); 
});

// Get user login route
router.get('/login', (req, res, next) => {
  res.render('login');
});

// Post user login route
router.post('/login', (req, res, next) => {
  Stylist.findOne({'details.email': req.body.email}, (err, user) => {
    if(err) throw err;
    if(!user) return res.status(404).send({success: false, msg: 'Email not registered'});
    // user found, comapre password
    const isPasswordMatch = Helpers.encryptPassword(req.body.password);
    if(isPasswordMatch === user.details.password) {
      // generate jwt token
      const token = jwt.sign({user}, config.secret, {expiresIn: 10000});
      if(!token) return res.status(500).send({success: false, msg: `Internal server error`})
      res.status(200).send({
        success: true,
        header_token: token,
        user: {
          name: user.details.name,
          email: user.details.email,
          username: user.details.username,
        }
      });
    }else {
      return res.status(400).send({success: false, msg: 'Password incorrect'});
    }
  })
});

// Get user logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).send({success: true, msg: 'Successfully logged out'});
});

module.exports = router;
