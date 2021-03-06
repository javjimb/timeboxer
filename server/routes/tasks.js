const express = require('express');
const router = new express.Router();
const TasksController = require('../controllers/tasks.controller');
const auth = require('../middleware/auth');

/**
 * @apiDefine authenticated Needs an 'x-access-token' header
 *      An access token for an existing user can be generated with the endpoint:  Auth -> Login
 */

/**
 * @api {get} /tasks List all tasks
 * @apiName GetTasks
 * @apiGroup Tasks
 * @apiPermission authenticated
 * @apiParam {String="new","in-progress","scheduled","completed"} [status] Task status
 * @apiParam {Number} [fromTimestamp] Scheduled tasks after this date (Unix timestamp)
 * @apiParam {Number} [untilTimestamp] Scheduled tasks until this date (Unix timestamp)
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
 *    HTTP/1.1 201 OK
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
router.get('/', auth, TasksController.getAll);

/**
 * @api {get} /tasks/:id Find a task
 * @apiGroup Tasks
 * @apiPermission authenticated
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

router.get('/:id', auth,  TasksController.getById);

/**
 * @api {post} /tasks Create a task
 * @apiGroup Tasks
 * @apiPermission authenticated
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
router.post('/', auth, TasksController.create);

/**
 * @api {put} /tasks/:id Update a task
 * @apiGroup Tasks
 * @apiPermission authenticated
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
router.put('/:id', auth, TasksController.update);

/**
 * @api {delete} /tasks/:id Remove a task
 * @apiGroup Tasks
 * @apiPermission authenticated
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
router.delete('/:id', auth, TasksController.delete);

module.exports = router;
