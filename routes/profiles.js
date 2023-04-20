const express = require('express');
const router = express.Router();
const  { User } = require('../models/user');
const Auth = require('../middleware/auth');

router.get('/', Auth, async (req, res) => {
    console.log(req);
    const users = await User.find().select({name:1, email: 1, _id: 0}).sort({name: 1});
    res.send(users);
});


module.exports = router;