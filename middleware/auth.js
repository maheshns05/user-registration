const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    if(!req.header('x-auth-token')) return res.status(401).send('No Token Provided');
    try {
        const user = jwt.verify(req.header('x-auth-token'), config.get('privateKey'));
        req.userId = user.userId
        console.log(user);
        next();
    } catch(err) {
        res.status(403).send(`Access Denied: Invalid Token`);
    }

}