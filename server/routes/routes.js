const express = require('express');
const TaskService = require('../services/taskService');
const { check, validationResult } = require('express-validator');

const router = new express.Router();


//routes.post('/tasks', TaskService.createTask);
router.get('/tasks', (req, res) => {
    TaskService.getTasks({}).then((result) => {
        res.send(result);
    });

});

router.get('/tasks/:id', (req, res, next) => {

    TaskService.getTaskById(req.params.id).then((result) => {
        res.send(result);
    }).catch( err => {
        return res.status(404).json({ errors: [{ msg: 'Could not find task with id ' + req.params.id}] });
    });

});

router.post('/tasks', [
        check('name').not().isEmpty().withMessage('Task name cannot be empty')
    ],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        TaskService.createTask(req.body).then((result) => {
            res.status(201).send(result);
        });
});

router.put('/tasks/:id', [
        check('name').optional().not().isEmpty().withMessage('Task name cannot be empty'),
        check('status').optional().isIn(['new', 'in-progress', 'completed', 'scheduled']).withMessage('Invalid task status')
    ],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(500).json({ errors: errors.array() });
        }

        TaskService.updateTask(req.params.id, req.body).then((result) => {
            res.send(result);
        }).catch( err => {
            return res.status(500).json({ errors: [{ msg: 'Could not update task'}] });
        });
});

router.delete('/tasks/:id', async (req, res) => {

    TaskService.deleteTask(req.params.id).then((result) => {
        res.send(result);
    })
});

module.exports = router;
