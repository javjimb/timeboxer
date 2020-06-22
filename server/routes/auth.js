const express = require('express');
const router = new express.Router();
const AuthController = require('../controllers/auth.controller');
const auth = require('../middleware/auth');

/**
 * @api {post} /auth/login Login
 * @apiDescription Generates an authentication token for an existing user
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
router.post('/login', AuthController.login);

/**
 * @api {post} /auth/me Me
 * @apiDescription Returns the authenticated user's data
 * @apiGroup Auth
 * @apiPermission authenticated
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
router.get('/me', auth, AuthController.me);

module.exports = router;
