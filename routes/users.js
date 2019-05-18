const express = require('express');
const router = express.Router();
const Helpers = require('../helpers/helpers');
const Stylist = require('../models/Stylist');
const passport = require('passport');
const isAuthenticated = require('../config/auth');

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
    if(!encrypted) return res.status(500).sendStatus(500);
    // create new user 
    const stylist = new Stylist({
      details: {
        name: user.name,
        email: user.email,
        username: user.username,
        password: encrypted
      }
    });
    // persist new user to database 
    stylist.save((err, success) =>{
      if(err) {
        err.code === 11000 ? err.message = `Email already in use` : err.message = null;
        return res.status(400).send(err.message);
      }
      res.status(200).redirect('/users/login');
    });
  }); 
});

// Get user login route
router.get('/login', (req, res, next) => {
  res.render('login');
});

// Post user login route
router.post('/login', (req, res, next) => {
  // authenticate user
  passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login'
})(req, res, next);
});

// Get user dashboard route
router.get('/dashboard', isAuthenticated, (req, res, next) => {
  console.log(req.token)
  const user = req.user;
  if(!user) if(!user) return res.status(401).send('Ooops, please login to view the resource');
  res.send({
    name: user.details.name,
    email: user.details.email
  });
});

// Get user logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
