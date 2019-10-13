const verifySignUp = require('../helpers/verifySignUp');
const authJwt = require('../helpers/verifyJwtToken');

const contentController = require('../controller/contentController.js');

// const config       = require('../config/config')();
module.exports = function (app) {

    /**
     * @swagger
     * definitions:
     *   Content:
     *     properties:
     *       name:
     *         type: string
     *       done:
     *         type: boolean
     *       content:
     *         type: string
     *       priority:
     *         type: string
     *
     */

    /**
     * @swagger
     * /content:
     *   post:
     *     tags:
     *       - Content
     *     description: Creates a new user
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: content
     *         description: Content object
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Content'
     *     responses:
     *       200:
     *         description: Successfully created
     */
    app.post('/api/content', [authJwt.verifyToken], contentController.addContent);


    /**
     * @swagger
     * /content:
     *   get:
     *     tags:
     *       - Content
     *     description: Returns all contents for logged user
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/Content'
     */

    app.get('/api/content', [authJwt.verifyToken], contentController.getAllContents);

    /**
     * @swagger
     * /content/{id}:
     *   get:
     *     tags:
     *       - Content
     *     description: Get one content by id
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Content's id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/Content'
     */
    app.get('/api/content/:id', [authJwt.verifyToken], contentController.getOneContent);

    /**
     * @swagger
     * /content/{id}:
     *   put:
     *     tags:
     *       - Content
     *     description: Update content by id
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Content's id
     *         in: path
     *         required: true
     *         type: integer
     *       - name: content
     *         description: Content object
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Content'
     *     responses:
     *       200:
     *         description: Successfully updated
     */
    app.put('/api/content/:id', [authJwt.verifyToken], contentController.updateContent);


    /**
     * @swagger
     * /content/{id}:
     *   delete:
     *     tags:
     *       - Content
     *     description: Update content by id
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Content's id
     *         in: path
     *         required: true
     *         type: integer
     *         schema:
     *           $ref: '#/definitions/Content'
     *     responses:
     *       200:
     *         description: Successfully deleted
     */

    app.delete('/api/content/:id', [authJwt.verifyToken], contentController.deleteContent);

}
