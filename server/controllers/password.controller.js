const UserService = require('../services/userService');
const emailService = require('../services/emailService');
const { check, validationResult } = require('express-validator');
const crypto = require('crypto');

class PasswordController {

    async reset(req, res) {

        await check('email').not().isEmpty().withMessage('Email is required').run(req);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let user = await UserService.findByEmail(req.body.email);

        if (!user) {
            return res.status(404).json({ errors: "Email address not found" });
        }

        // generate a new random password
        let password = crypto.randomBytes(4).toString('hex')

        UserService.updateUser(user._id.toString(), {password: password}).then((result) => {

            emailService.sendResetPasswordEmail(user, password);

            res.status(204).send();

        }).catch( err => {
            return res.status(500).json({ errors: [{ msg: 'Could not reset password: ' + err}] });
        });
    }
}

module.exports = new PasswordController();
