const express = require('express');
const router = express.Router();
const Stylist = require('../models/Stylist');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// GET all stylists
router.get('/stylists/all', (req, res) =>{
  Stylist.find()
  .then((records) =>{
    res.send(records)
  }).catch((err) =>{
    res.send(err)
  })
})

module.exports = router;
