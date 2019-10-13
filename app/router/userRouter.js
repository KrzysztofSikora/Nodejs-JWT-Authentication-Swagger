const verifySignUp = require('../helpers/verifySignUp');
const authJwt = require('../helpers/verifyJwtToken');

const contentController = require('../controller/contentController.js');
const userController = require('../controller/userController.js');

// const config       = require('../config/config')();
module.exports = function (app) {


    /**
     * @swagger
     * definitions:
     *   User:
     *     properties:
     *       name:
     *         type: string
     *       username:
     *         type: string
     *       email:
     *         type: integer
     *       password:
     *         type: string
     *       roles:
     *         type: array
     *         items:
     *          type: string
     */

    /**
     * @swagger
     * definitions:
     *   UserLogin:
     *     properties:
     *       username:
     *         type: string
     *       password:
     *         type: string
     *
     */

    /**
     * @swagger
     * definitions:
     *   UserToken:
     *     properties:
     *       token:
     *         type: string
     */


    /**
     * @swagger
     * definitions:
     *   UserLogged:
     *     properties:
     *       id:
     *         type: string
     *       name:
     *         type: string
     *       username:
     *          type: string
     *       email:
     *           type: string
     *       token:
     *         type: string
     *       createdAt:
     *         type: string
     *       updatedAt:
     *          type: string
     *       roles:
     *          type: array
     *          items:
     *            type: string
     */

    /**
     * @swagger
     * definitions:
     *   UserContent:
     *     properties:
     *       description:
     *         type: string
     *       user:
     *         type: object
     */

    /**
     *
     *
     * @swagger
     *  /auth/signup:
     *   post:
     *     tags:
     *       - User
     *     description: Creates a new user
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: user
     *         description: Puppy object
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/User'
     *     responses:
     *       200:
     *         description: Successfully created
     */
    app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], userController.signup);
    /**
     * @swagger
     * /auth/signin:
     *   post:
     *     tags:
     *       - User
     *     description: Returns a single user
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: user
     *         description: Puppy object
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/UserLogin'
     *
     *     responses:
     *       200:
     *         description: A single puppy
     *         schema:
     *           $ref: '#/definitions/UserLogged'
     */
    app.post('/api/auth/signin', userController.signin);

    /**
     * @swagger
     * /test/user:
     *   get:
     *     tags:
     *       - User
     *     description: Returns a single user
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: A single user with details
     *         schema:
     *           $ref: '#/definitions/UserContent'
     */

    app.get('/api/test/user', [authJwt.verifyToken], contentController.userContent);


    /**
     * @swagger
     * /users:
     *   get:
     *     tags:
     *       - User
     *     description: Returns array of all users
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Array of  user with details
     *         schema:
     *           $ref: '#/definitions/User'
     *
     *
     */

    app.get('/api/users', [authJwt.verifyToken], userController.userGetAll);


    /**
     * @swagger
     * /test/pm:
     *   get:
     *     tags:
     *       - User
     *     description: Returns a single user
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: A single puppy
     *         schema:
     *           $ref: '#/definitions/User'
     */

    app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], userController.managementBoard);

    /**
     * @swagger
     * /test/admin:
     *   get:
     *     tags:
     *       - User
     *     description: Returns a single user
     *     produces:
     *       - application/json
     *
     *     responses:
     *       200:
     *         description: A single puppy
     *         schema:
     *           $ref: '#/definitions/User'
     */
    app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], userController.adminBoard);

}
