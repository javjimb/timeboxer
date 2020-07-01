const express = require('express');
const router = new express.Router();
const UsersController = require('../controllers/users.controller');
const auth = require('../middleware/auth');

/**
 * @api {post} /users Create a user
 * @apiGroup User
 * @apiPermission none
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParam {String} [name] User name
 * @apiParam {String} [surname] User surname
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
router.post('/', UsersController.create);


/**
 * @api {put} /users/:id Update a user
 * @apiGroup User
 * @apiPermission authenticated
 * @apiParam {id} id User id
 * @apiParam {String} [name] User name
 * @apiParam {String} [surname] User surname
 * @apiParam {String} [avatar] User avatar (base64)
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *     {
 *     _id: '5ec27dc7cf8f3b536a3be300',
 *       name: 'Keara',
 *       surname: 'Muller',
 *       email: 'Gilberto19@hotmail.com',
 *       createdAt: '2020-05-18T12:21:27.018Z',
 *       updatedAt: '2020-05-18T12:21:27.018Z',
 *     }
 *
 * @apiErrorExample {json} Server
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:id', auth, UsersController.update);

/**
 * @api {get} /users/:id Find a user
 * @apiGroup User
 * @apiPermission authenticated
 * @apiParam {String} id User id
 *
 * @apiParam {id} id User id
 * @apiSuccess {id} id User id
 * @apiSuccess {String} name User name
 * @apiSuccess {String} surname User surname
 * @apiSuccess {String} avatar User avatar (base64)
 * @apiSuccess {Date} updatedAt When the last update was made
 * @apiSuccess {Date} createdAt When the user was created
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       "_id": "5e9d4825e40a457a5cd02449",
 *       name: 'Keara',
 *       surname: 'Muller',
 *       email: 'Gilberto19@hotmail.com',
 *       createdAt: '2020-05-18T12:21:27.018Z',
 *       updatedAt: '2020-05-18T12:21:27.018Z',
 *    }
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found
 *    {
 *      "errors": [
 *          {"msg": "Could not find user with id 5e9d4825e40a457a5cd02449"}
 *      ]
 *    }
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */

router.get('/:id', auth,  UsersController.getById);


module.exports = router;
