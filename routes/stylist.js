const express = require('express');
const router = express.Router();
const Stylist = require('../models/Stylist');
const Helpers = require('../helpers/helpers');
// @ GET login page
// @ To do render login page
// router.get('/login', (req, res) => {
//     res.render('login');
// });

// @ POST /stylist/login
router.post('/login', (req, res, next) => {
    // look up user in the database
    Stylist.findOne({'details.email': req.body}, (err, user) =>{
        if(err || !user) return res.status(404).send('Email not registered, no such user exixts');
        if(user) res.status(200).send(user)
    })
});

module.exports = router;