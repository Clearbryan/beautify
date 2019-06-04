// file contains applications logic for stylist dashboard page

// Dependancies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Stylist = require('../../models/Stylist');

// @route GET - display the stylist dashboard homepage
router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).send({
        success: true,
        msg: 'Dashboard redirect successful',
        user: {
          name: req.user.details.name,
          email: req.user.details.email,
          username: req.user.details.username,
        }
      });
});

// @route POST - edit the stylist profile page
router.post('/:name/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
    // lookup stylist to be edited
    Stylist.findById(req.user._id, (err, user) =>{
        if(err) return res.send(err);
        user.insertOne()
    
    // localhost:3000/dashboard?user=username/edit
    })
});

router.post(`/profile/edit/:name`, passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send(req.user);
});


module.exports = router;
