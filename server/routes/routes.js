const express = require('express');
const TaskService = require('../services/taskService');
const { check, validationResult } = require('express-validator');

const router = new express.Router();


/**
 * @api {get} /tasks List all tasks
 * @apiName GetTasks
 * @apiGroup Tasks
 * @apiParam {String="new","in-progress","scheduled","completed"} [status] Task status
 * @apiParam {Number} [fromTimestamp] Scheduled tasks after this date
 * @apiParam {Number} [untilTimestamp] Scheduled tasks until this date
 *
 * @apiSuccess {Object[]} tasks Task's list
 * @apiSuccess {String} tasks._id Task unique id
 * @apiSuccess {String} tasks.name Task name
 * @apiSuccess {String} tasks.status Status of the task
 * @apiSuccess {Number} tasks.start Start time of the task (Unix timestamp)
 * @apiSuccess {Number} tasks.end End time of the task (Unix timestamp)
 * @apiSuccess {Number} tasks.duration Task duration in hours
 * @apiSuccess {Date} tasks.updatedAt When the last update was made
 * @apiSuccess {Date} tasks.createdAt When the task was created
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      tasks: [{
 *           "_id": "5e9d4825e40a457a5cd02449",
 *           "status": "scheduled",
 *           "name": "Buy bananas",
 *           "end": 1587550500,
 *           "start": 1587546900,
 *           "duration": 1,
 *           "createdAt": "2020-04-20T06:58:45.303Z",
 *           "updatedAt": "2020-04-22T07:42:08.944Z"
 *          }]
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/tasks', (req, res) => {

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
});

/**
 * @api {get} /tasks/:id Find a task
 * @apiGroup Tasks
 * @apiParam {String} id Task id
 *
 * @apiSuccess {String} _id Task id
 * @apiSuccess {String} name Task name
 * @apiSuccess {String} status Status of the task
 * @apiSuccess {Number} start Start time of the task (Unix timestamp)
 * @apiSuccess {Number} end End time of the task (Unix timestamp)
 * @apiSuccess {Number} duration Task duration in hours
 * @apiSuccess {Date} updatedAt When the last update was made
 * @apiSuccess {Date} createdAt When the task was created
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       "_id": "5e9d4825e40a457a5cd02449",
 *       "status": "scheduled",
 *       "name": "Buy bananas",
 *       "end": 1587550500,
 *       "start": 1587546900,
 *       "duration": 1,
 *       "createdAt": "2020-04-20T06:58:45.303Z",
 *       "updatedAt": "2020-04-22T07:42:08.944Z"
 *    }
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found
 *    {
 *      "errors": [
 *          {"msg": "Could not find task with id 23434"}
 *      ]
 *    }
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/tasks/:id', (req, res, next) => {

    TaskService.getTaskById(req.params.id).then((result) => {
        res.send(result);
    }).catch( err => {
        return res.status(404).json({ errors: [{ msg: 'Could not find task with id ' + req.params.id}] });
    });

});

/**
 * @api {post} /tasks Create a task
 * @apiGroup Tasks
 * @apiParam {String} name Task name
 * @apiParam {Number} duration Task duration
 * @apiParam {String="new","in-progress","scheduled","completed"} [status=new] Status of the task
 * @apiParam {Number} [start] Start time of the task (Unix timestamp)
 * @apiParam {Number} [end] End time of the task (Unix timestamp)
 *
 * @apiSuccess {String} _id Task id
 * @apiSuccess {String} name Task name
 * @apiSuccess {String} status Status of the task
 * @apiSuccess {Number} start Start time of the task (Unix timestamp)
 * @apiSuccess {Number} end End time of the task (Unix timestamp)
 * @apiSuccess {Number} duration Task duration in hours
 * @apiSuccess {Date} updatedAt When the last update was made
 * @apiSuccess {Date} createdAt When the task was created
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 Created
 *    {
 *       "_id": "5e9d4825e40a457a5cd02449",
 *       "status": "scheduled",
 *       "name": "Buy bananas",
 *       "end": 1587550500,
 *       "start": 1587546900,
 *       "duration": 1,
 *       "createdAt": "2020-04-20T06:58:45.303Z",
 *       "updatedAt": "2020-04-22T07:42:08.944Z"
 *    }
 * @apiErrorExample {json} Validation
 *    HTTP/1.1 422 Unprocessable Entity
 *    {
 *      "errors": [
 *          {
 *           "msg": "Task name cannot be empty",
 *           "param": "name",
 *           "location": "body"
 *          }
 *      ]
 *    }
 * @apiErrorExample {json} Server
 *    HTTP/1.1 500 Internal Server Error
 */
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

/**
 * @api {put} /tasks/:id Update a task
 * @apiGroup Tasks
 * @apiParam {id} id Task id
 * @apiParam {String} [name] Task name
 * @apiParam {Number} [duration] Task duration
 * @apiParam {String="new","in-progress","scheduled","completed"} [status=new] Status of the task
 * @apiParam {Number} [start] Start time of the task (Unix timestamp)
 * @apiParam {Number} [end] End time of the task (Unix timestamp)
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       "_id": "5e9d4825e40a457a5cd02449",
 *       "status": "scheduled",
 *       "name": "Buy bananas",
 *       "end": 1587550500,
 *       "start": 1587546900,
 *       "duration": 1,
 *       "createdAt": "2020-04-20T06:58:45.303Z",
 *       "updatedAt": "2020-04-22T07:42:08.944Z"
 *    }
 * @apiErrorExample {json} Validation
 *    HTTP/1.1 422 Unprocessable Entity
 *    {
 *      "errors": [
 *          {
 *           "msg": "Task name cannot be empty",
 *           "param": "name",
 *           "location": "body"
 *          }
 *      ]
 *    }
 * @apiErrorExample {json} Server
 *    HTTP/1.1 500 Internal Server Error
 */
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

/**
 * @api {delete} /tasks/:id Remove a task
 * @apiGroup Tasks
 * @apiParam {id} id Task id
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       "_id": "5e9d4825e40a457a5cd02449",
 *       "status": "scheduled",
 *       "name": "Buy bananas",
 *       "end": 1587550500,
 *       "start": 1587546900,
 *       "duration": 1,
 *       "createdAt": "2020-04-20T06:58:45.303Z",
 *       "updatedAt": "2020-04-22T07:42:08.944Z"
 *    }
 * @apiErrorExample {json} Validation
 *    HTTP/1.1 422 Unprocessable Entity
 *    {
 *      "errors": [
 *          {
 *           "msg": "Task name cannot be empty",
 *           "param": "name",
 *           "location": "body"
 *          }
 *      ]
 *    }
 * @apiErrorExample {json} Server
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/tasks/:id', async (req, res) => {

    TaskService.deleteTask(req.params.id).then((result) => {
        res.send(result);
    })
});

module.exports = router;
