const UserService = require("../services/userService");
const ExternalAuthService = require("../services/externalAuthService");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

class AuthController {

    async login(req, res) {
        await check("email")
            .not()
            .isEmpty()
            .withMessage("Invalid email")
            .run(req);
        await check("password")
            .not()
            .isEmpty()
            .withMessage("Invalid password")
            .run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() });
        }

        let user = await UserService.findByEmail(req.body.email);

        if (!user) {
            return res.status(401).json({ errors: "Could not find email address registered" });
        }

        if (!user.isVerified) {
            return res.status(403).json({ errors: "Account has not been verified"});
        }

        let isMatch = await user.comparePassword(req.body.password);

        if (!isMatch) {
            return res.status(401).json({ errors: "Invalid password" });
        }
        const payload = {
            user: {
                _id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: 3600 * 24,
            },
            (err, token) => {
                if (err) throw err;
                user.password = undefined;
                res.status(200).json({
                    token: token,
                    user: user,
                });
            }
        );
    }

    async me(req, res) {
        try {
            const user = await UserService.findById(req.user._id).catch((e) => {
                console.error(e);
                process.exit(1);
            });
            user.password = undefined;
            res.status(200).send(user);
        } catch (err) {
            console.error(err);
            return res
                .status(403)
                .json({ errors: [{ msg: "Failed to authenticate token" }] });
        }
    }

    async social(req, res) {
        await check("email")
            .not()
            .isEmpty()
            .withMessage("Invalid email")
            .run(req);

        await check("provider_id")
            .not()
            .isEmpty()
            .withMessage("Invalid provider id")
            .run(req);

        await check("provider")
            .not()
            .isEmpty()
            .withMessage("Invalid provider")
            .run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() });
        }

        let user = await UserService.findByEmail(req.body.email);

        // create a new user if not found
        if (!user) {
            user = await UserService.createUser({
               name: req.body.name,
               surname: req.body.surname,
               email: req.body.email,
               avatar: req.body.avatar,
               isVerified: true,
               password: Math.random().toString(36).slice(-6)
            });
        }

        let externalAuth = await ExternalAuthService.getAll({
            provider: req.body.provider,
        });

        if (externalAuth.length > 0 && externalAuth[0].user.toString() !== user._id.toString()) {
            return res.status(401).json({ errors: "Could not validate external authentication" });
        }

        if (!externalAuth) {
            externalAuth = await ExternalAuthService.create({
                user: user._id,
                email: req.body.email,
                provider: req.body.provider,
                providerId: req.body.provider_id
            });
        }

        const payload = {
            user: {
                _id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: 3600 * 24,
            },
            (err, token) => {
                if (err) throw err;
                user.password = undefined;
                res.status(200).json({
                    token: token,
                    user: user,
                });
            }
        );
    }
}

module.exports = new AuthController();
