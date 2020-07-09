const UserService = require('../services/userService');
const { check, validationResult } = require('express-validator');
const emailService = require('../services/emailService');

class TokensController {

    async verify(req, res) {

        let token = await UserService.findVerificationToken(req.body.token);
        if (!token) {
            return res.status(400).send({ errors: [{ msg: 'Could not find user token'}] });
        }

        // verify ownership of the token
        if (token.user._id.toString() !== req.user._id) {
            return res.status(400).send({ errors: [{ msg: 'Invalid request'}] });
        }

        // if all good verify the user
        UserService.updateUser(token.user._id.toString(), {isVerified: true}).then((result) => {
            res.send(result);
        }).catch( err => {
            return res.status(500).json({ errors: [{ msg: 'Could not verify user'}] });
        });
    }

    /**
     * Re sends welcome email to a given email address
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async resend(req, res) {

        await check('email').not().isEmpty().withMessage('Email is required').run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let user = await UserService.findByEmail(req.body.email);

        if (!user) {
            return res.status(404).json({ errors: "Could not find email address registered" });
        }

        let token = await UserService.generateVerificationToken(user)

        emailService.sendWelcomeEmail(user, token);

        res.status(204).send();
    }
}

module.exports = new TokensController();
