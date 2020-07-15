const express = require('express');
const router = new express.Router();
const PasswordController = require('../controllers/password.controller');
const auth = require('../middleware/auth');

/**
 * @api {post} /password Reset password
 * @apiDescription Sends a new password via email to a registered email address
 * @apiGroup Password
 * @apiParam {String} email Registered email address
 * @apiPermission none
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Validation
 *    HTTP/1.1 422 Unprocessable Entity
 *    {
 *      "errors": [
 *         {
 *           "msg": "Email is required ",
 *           "param": "email",
 *           "location": "body"
 *         }
 *       ]
 *     }
 * @apiErrorExample {json} Not found
 *    HTTP/1.1 404 Not found
 *    {
 *      "errors": [
 *         {"msg": "Could not find email address registered"}
 *       ]
 *     }
 * @apiErrorExample {json} Server error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "errors": [
 *          {"msg": "Could not reset password"}
 *      ]
 *    }
 */
router.post('/', PasswordController.reset);

module.exports = router;
