// stylist model
const mongoose = require('mongoose');
const Joi = require('joi');

// stylist schema
const stylistSchema = mongoose.Schema({
    details: {
        name: {
            type: String,
            required: true 
        },
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        passwordConfirmation: {
            type: String,
            // required: true
        }
    }
}, { strict: false });

// exports the stylist model
const Stylist = module.exports = mongoose.model('Stylist', stylistSchema);

// validate input
stylistSchema.methods.validateInput = function(){
    
}
