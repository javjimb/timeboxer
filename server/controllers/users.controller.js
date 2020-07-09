const UserService = require('../services/userService');
const { check, validationResult } = require('express-validator');
const emailService = require('../services/emailService');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

class UsersController {

    getAll(req, res) {

        let filter = {}

        UserService.getUsers(filter).then((result) => {
            res.send({tasks : result});
        });
    }

    async create(req, res) {

        await check('email').not().isEmpty().withMessage('Email is required').run(req);
        await check('password').not().isEmpty().withMessage('Password is required').run(req);
        await check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        // check for duplicates
        let user = await UserService.findByEmail(req.body.email);
        if (user) {
            return res.status(409).json({ errors: [{ msg: 'The email address is already registered'}] });
        }

        const session = await mongoose.startSession();
        //session.startTransaction();

        try {

            UserService.createUser(req.body).then(async (user) => {

                // create a verification token for this user
                let token = await UserService.generateVerificationToken(user)

                emailService.sendWelcomeEmail(user, token);

                //await session.commitTransaction();

                res.status(201).send(user);
            });
        } catch (e) {
            //await session.abortTransaction();
            return res.status(500).json({ errors: [{ msg: 'Failed to register user', error: e}] });
        } finally {
            //session.endSession();
        }
    }

    update(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(500).json({ errors: errors.array() });
        }

        UserService.updateUser(req.params.id, req.body).then((result) => {
            res.send(result);
        }).catch( err => {
            return res.status(500).json({ errors: [{ msg: 'Could not update user'}] });
        });
    }

    delete(req, res) {
        UserService.deleteUser(req.params.id).then((result) => {
            res.send(result);
        })
    }

    getById(req, res) {
        UserService.findById(req.params.id).then((result) => {
            result.password = undefined;
            res.send(result);
        }).catch( err => {
            return res.status(404).json({ errors: [{ msg: 'Could not find user with id ' + req.params.id}] });
        });
    }
}

module.exports = new UsersController();
