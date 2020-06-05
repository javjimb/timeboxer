const TaskService = require('../services/taskService');
const { check, validationResult } = require('express-validator');

class TasksController {

    getById(req, res) {

        TaskService.getTaskById(req.params.id).then((result) => {
            res.send(result);
        }).catch( err => {
            return res.status(404).json({ errors: [{ msg: 'Could not find task with id ' + req.params.id}] });
        });
    }

    getAll(req, res) {

        let filter = {}

        // Only return tasks that belong to the authenticated user
        filter.user = req.user._id;

        // apply filters from query string
        if (req.query.fromTimestamp) {
            filter.start = { $gte: req.query.fromTimestamp}
        }
        if (req.query.untilTimestamp) {
            filter.end = { $lte: req.query.untilTimestamp}
        }
        if (req.query.status) {
            filter.status = { $eq: req.query.status}
        }

        TaskService.getTasks(filter).then((result) => {
            res.send({tasks : result});
        });
    }

    async create(req, res) {

        await check('name').not().isEmpty().withMessage('Task name cannot be empty').run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let task = {
            user: req.user ? req.user._id : null,
            name: req.body.name,
            duration: req.body.duration,
            status: req.body.status,
            start: req.body.start,
            end: req.body.end
        }

        TaskService.createTask(task).then((result) => {
            res.status(201).send(result);
        });
    }

    async update(req, res) {

        await check('name').optional().not().isEmpty().withMessage('Task name cannot be empty').run(req);
        await check('status').optional().isIn(['new', 'in-progress', 'completed', 'scheduled']).withMessage('Invalid task status').run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(500).json({ errors: errors.array() });
        }

        // validate task
        let task = await TaskService.getTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ errors: 'Invalid task id' });
        }

        // verify ownership of the task
        if (task.user != req.user._id) {
            return res.status(403).json({ errors: ['Permission denied'] });
        }

        TaskService.updateTask(req.params.id, req.body).then((result) => {
            res.send(result);
        }).catch( err => {
            return res.status(500).json({ errors: [{ msg: 'Could not update task'}] });
        });
    }

    async delete(req, res) {

        // validate task
        let task = await TaskService.getTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ errors: 'Invalid task id' });
        }

        // verify ownership of the task
        if (task.user != req.user._id) {
            return res.status(403).json({ errors: ['Permission denied'] });
        }

        TaskService.deleteTask(req.params.id).then((result) => {
            res.send(result);
        })
    }
}

module.exports = new TasksController();
