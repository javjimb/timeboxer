const express = require('express');
const router = new express.Router();
const TokensController = require('../controllers/tokens.controller');
const auth = require('../middleware/auth');


/**
 * @api {put} /tokens Verify token
 * @apiDescription Verifies a token of an non verified user account
 * @apiGroup Verification Token
 * @apiPermission authenticated
 * @apiParam {String} token Verification token
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       "_id": "5e9d4825e40a457a5cd02449",
 *       name: 'Keara',
 *       surname: 'Muller',
 *       email: 'Gilberto19@hotmail.com',
 *       isVerified: true,
 *       createdAt: '2020-05-18T12:21:27.018Z',
 *       updatedAt: '2020-05-18T12:21:27.018Z',
 *    }
 * @apiErrorExample {json} Missing or invalid token
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors": [
 *          {"msg": "Could not find user token"}
 *      ]
 *    }
 * @apiErrorExample {json} Verification error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "errors": [
 *          {"msg": "Could not verify user"}
 *      ]
 *    }
 */
router.put('/:token', auth, TokensController.verify);

/**
 * @api {post} /tokens Re-send token
 * @apiDescription Sends a new token via email to a registered email address
 * @apiGroup Verification Token
 * @apiParam {String} email Registered email address
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
 *          {"msg": "Could not verify user"}
 *      ]
 *    }
 */
router.post('/', TokensController.resend);

module.exports = router;
