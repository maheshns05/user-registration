const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 15
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.methods.generateToken = function() {
    return jwt.sign({userId: this.id}, config.get('privateKey'));
}

const User = mongoose.model('user', UserSchema);

function validateUser(obj) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(15).required()
    })

    return schema.validate(obj);
}

module.exports = {
    UserSchema,
    User,
    validateUser
}