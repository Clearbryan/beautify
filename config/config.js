// file contains configuration settings
const mongoose = require('mongoose');

let environment;
process.env.PORT ? environment = 'production': environment = 'development';
const config = module.exports = {
    'PORT': process.env.PORT || 5000,
    'environment': environment,
    'dbConnection': 'mongodb://localhost:27017/BeautifyDB',
    'encryptionSecret': 'clear123'
}
