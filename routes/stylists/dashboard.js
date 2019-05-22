// file contains applications logic for stylist dashboard page

// Dependancies
const express = require('express');
const router = express.Router();
const passport = require('passport');

// @route GET - display the stylist dashboard homepage
router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
});

router.post(`/profile/edit/:name`, passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send(req.user);
})


module.exports = router;
