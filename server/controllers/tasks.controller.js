const TaskService = require('../services/taskService');
const { validationResult } = require('express-validator');

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

    create(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        TaskService.createTask(req.body).then((result) => {
            res.status(201).send(result);
        });
    }

    update(req, res) {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(500).json({ errors: errors.array() });
        }

        TaskService.updateTask(req.params.id, req.body).then((result) => {
            res.send(result);
        }).catch( err => {
            return res.status(500).json({ errors: [{ msg: 'Could not update task'}] });
        });
    }

    delete(req, res) {
        TaskService.deleteTask(req.params.id).then((result) => {
            res.send(result);
        })
    }
}

module.exports = new TasksController();
