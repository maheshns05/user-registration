const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

router.post('/', async (req, res) => {
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or Password is not valid');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Incorrect password');

    const token = user.generateToken();
    res.header('x-auth-token', token).send({name: user.name, email: user.email});
});

function validateUser(obj) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(15).required()
    })

    return schema.validate(obj);
}

module.exports = router;