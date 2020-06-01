const express = require('express');
const TasksController = require('../controllers/tasks.controller');
const UsersController = require('../controllers/users.controller');
const AuthController = require('../controllers/auth.controller');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const router = new express.Router();

/**
 * @api {get} /tasks List all tasks
 * @apiName GetTasks
 * @apiGroup Tasks
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
router.get('/tasks', TasksController.getAll);

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

router.get('/tasks/:id', TasksController.getById);

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
    TasksController.create
);

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
    TasksController.update
);

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
router.delete('/tasks/:id', TasksController.delete);

/**
 * @api {post} /users Create a user
 * @apiGroup User
 * @apiPermission none
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParam {String} [name] User name
 * @apiParam {String} [surname] User syrname
 *
 * @apiSuccess {String} _id User id
 * @apiSuccess {String} name User name
 * @apiSuccess {String} surname User surname
 * @apiSuccess {String} email User email
 * @apiSuccess {Date} updatedAt When the last update was made
 * @apiSuccess {Date} createdAt When the user was created
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 Created
 *     {
 *     _id: '5ec27dc7cf8f3b536a3be300',
 *       name: 'Keara',
 *       surname: 'Muller',
 *       email: 'Gilberto19@hotmail.com',
 *       createdAt: '2020-05-18T12:21:27.018Z',
 *       updatedAt: '2020-05-18T12:21:27.018Z',
 *     }
 *
 * @apiErrorExample {json} Validation
 *    HTTP/1.1 422 Unprocessable Entity
 *    {
 *      "errors": [
 *         {
 *           "msg": "Email is required ",
 *           "param": "email",
 *           "location": "body"
 *         },
 *         {
 *           "value": "123",
 *           "msg": "Password must be at least 6 characters long",
 *           "param": "password",
 *           "location": "body"
 *         }
 *       ]
 *     }
 * @apiErrorExample {json} Server
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/users', UsersController.create);

/**
 * @api {post} /auth/login Login
 * @apiDescription Generates an authentication token
 * @apiGroup Auth
 * @apiPermission none
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 *
 * @apiSuccess {String} token Access token
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 *  "token": "eyJhb8ciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlY2U4YTQ1MTZiYWQ0NDJiMDdhNmQwNyIsIm5hbWUiOiJKYXZpZXIiLCJzdXJuYW1lIjoiSmltZW5leiIsImVtYWlsIjoiamF2amltYkBnbWFpbC5jb20ifSwiaWF0IjoxNTkxMDI1NjI2LCJleHAiOjE1OTEwNjg4IjZ9.FEEEVvG4fBmZUjbs6aSleImm0AiPBx9rR0gIVfIJze0"
 * }
 *
 * @apiErrorExample {json} Authorization
 *    HTTP/1.1 401 Unauthorized
 *  {
 *      "errors": "Invalid password"
 *  }
 * @apiErrorExample {json} Server
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/auth/login', AuthController.login);

/**
 * @api {post} /auth/me Me
 * @apiDescription Returns the authenticated user's data
 * @apiGroup Auth
 * @apiHeader {String} x-access-token User access token
 *
 * @apiSuccess {String} _id User id
 * @apiSuccess {String} name User name
 * @apiSuccess {String} surname User surname
 * @apiSuccess {String} email User email
 * @apiSuccess {Date} createdAt When the user was created
 * @apiSuccess {Date} updatedAt When the last update was made
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  {
 *  "_id": "5ece8a4516bad442b07a6d07",
 *  "email": "william.amos@gmail.com",
 *  "name": "William",
 *  "surname": "Amos",
 *  "createdAt": "2020-05-27T15:41:57.865Z",
 *  "updatedAt": "2020-05-27T15:41:57.865Z",
 * }
 *
 * @apiErrorExample {json} Server
 *    HTTP/1.1 500 Internal Server Error
 *  {
 *      "errors": "Failed to authenticate token"
 *  }
 */
router.get('/auth/me', auth, AuthController.me);



module.exports = router;
