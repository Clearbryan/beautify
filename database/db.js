// database connection settings

const config = require('../config/config');
const mongoose = require('mongoose');

mongoose.connect(config.dbConnection, {useNewUrlParser: true});
const db = module.exports = mongoose.connection;

