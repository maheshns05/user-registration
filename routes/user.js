const express = require('express');
const router = express.Router();
const { UserSchema, User, validateUser } = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/',async (req, res) => {
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('Email already Exists');
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password
    });

    user = await user.save();

    res.send(user);

});

module.exports = router;