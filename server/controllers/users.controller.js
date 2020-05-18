const UserService = require('../services/userService');
const { check, validationResult } = require('express-validator');

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

        UserService.createUser(req.body).then((result) => {
            res.status(201).send(result);
        });
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
}

module.exports = new UsersController();
