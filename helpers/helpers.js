const Joi = require('joi');
const crypto = require('crypto');
const config = require('../config/config');

const Helpers = module.exports = {
    // validate user input
    'validateInput': function(){
        const validate = Joi.object().keys({
            name: Joi.string().min(3).required().error(new Error('Name is required')),
            email: Joi.string().email().required().error(new Error('Invalid email format')),
            username: Joi.string().required().min(6).max(30).error(new Error('Username is required')),
            password: Joi.string().min(6).required().error(new Error('Password is required and should be at least 6 characters long')),
            passwordConfirmation: Joi.string().valid(Joi.ref('password')).error(new Error('Passwords do not match')),
        });
        return validate;
    },
    // harsh password
    'encryptPassword': function (password){
        const encrypted = crypto.createHmac('sha256', config.encryptionSecret).update(password).digest('hex');
        return encrypted;
    }
    
}