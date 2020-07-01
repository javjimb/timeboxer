const jwt = require("jsonwebtoken");
const UserService = require('../services/userService');

module.exports = function(req, res, next) {
    let token = req.header('x-access-token');
    if (!token) {
        return res.status(401).json({ errors: [{ msg: 'No access token provided'}] });
    }
    jwt.verify(token, process.env.JWT_SECRET, ( err, decoded) => {
        if (err) {
            return res.status(403).json({ errors: [{ msg: 'Failed to authenticate token'}] });
        }
        UserService.findById(decoded.user._id).then(user => {
            req.user = user;
            next();
        }).catch( e => {
         //   console.error(e)
            next();
        });
    })
};
