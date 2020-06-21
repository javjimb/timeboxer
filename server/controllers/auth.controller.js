const UserService = require('../services/userService');
const { check, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

class AuthController {

    async login(req, res) {

        await check('email').not().isEmpty().withMessage('Invalid email').run(req);
        await check('password').not().isEmpty().withMessage('Invalid password').run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() });
        }

        let user = await UserService.findByEmail(req.body.email);

        if (!user) {
            return res.status(401).json({ errors: 'Could not find email address registered'});
        }

        let isMatch = await user.comparePassword(req.body.password);

        if (!isMatch) {
            return res.status(401).json({ errors: 'Invalid password'});
        }
        const payload = {
            user: {
                _id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: 3600 * 24
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token: token
                });
            }
        );
    }

    async me(req, res) {
        try {
            const user = await UserService.findById(req.user._id).catch( e => {
                console.error(e);
                process.exit(1);
            });
            user.password = undefined;
            res.status(200).send(user);
        } catch (err) {
            console.error(err);
            return res.status(403).json({ errors: [{ msg: 'Failed to authenticate token'}] });
        }
    }
}

module.exports = new AuthController();
