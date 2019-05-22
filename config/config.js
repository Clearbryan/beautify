// file contains configuration settings
const mongoose = require('mongoose');

let environment;
process.env.PORT ? environment = 'production': environment = 'development';
const config = module.exports = {
    'PORT': process.env.PORT || 5007,
    'environment': environment,
    'dbConnection': 'mongodb://localhost:27017/beautifyDB',
    'encryptionSecret': 'clear123',
    'secret': 'this is the secret'
}
