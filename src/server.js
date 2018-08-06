const express = require('express');
const app = express();
const myParser = require("body-parser");
//const fs = require('fs');
const swaggerJSDoc = require('swagger-jsdoc');
const getusers = require('./mods/userdetails');
const getclone = require('./mods/clone_available');
const putclone = require('./mods/clone');
const deleteusers = require('./mods/delete');
const error404 = require('./mods/error_404');
const postusers = require('./mods/log_person');

let swaggerDefinition = {
    info: {
        title: 'falcon API',
        version: '1.0.0',
        description: 'Demonstrating how to use falcon api',
    },
    host: 'localhost:8080',
    basePath: '/',
};
// options for the swagger docs
let options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['**/*.js'],// pass all in array 
};
// initialize swagger-jsdoc
let swaggerSpec = swaggerJSDoc(options);

app.use(myParser.urlencoded({ extended: true }));
app.use(myParser.json());
app.use(myParser.json({ type: 'application/vnd.api+json' }))

/**
 * @swagger
 * definition:
 *   users:
 *     properties :
 *       account:
 *         properties:
 *           firstname:
 *             type: string
 *           lastname:
 *             type: string
 *           email:
 *             type: string
 *           password:
 *             type: string
 *           city:
 *             type: string
 *           state:
 *             type: string
 *           country:
 *             type: string
 *           zip:
 *             type: integer
 *           phnum:
 *             type: integer
 *           alternateemail:
 *             type: string
 *   user:
 *     properties :
 *       account:
 *         properties:
 *           firstname:
 *             type: string
 *           lastname:
 *             type: string
 *           email:
 *             type: string
 *           password:
 *             type: string
 *           city:
 *             type: string
 *           state:
 *             type: string
 *           country:
 *             type: string
 *           zip:
 *             type: integer
 *           phone:
 *             type: integer
 *           alteremail:
 *             type: string
 * 
 */
app.get('/swagger.json', function (req, res) 
{ 
    res.setHeader('Content-Type', 'application/json'); 
    res.send(swaggerSpec); 
});
/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *         - name: account
 *           description: user object
 *           in: body
 *           required: true
 *           schema:
 *             $ref: '#/definitions/users'
 *     responses:
 *       201:
 *         description: New resource has been created
 *       500:
 *         description: Internal Server Error
 *       304:
 *         description: Email already exists
 */
app.post('/api/v1/users', function (req, res) {

    postusers.read(req, res);
    // eval(fs.readFileSync('mods/log_person.js') + '');

})


/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/user'
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: user not found
 */
app.get('/api/v1/users', function (req, res) {

    getusers.read(req, res);
    //eval(fs.readFileSync('mods/userdetails.js') + '');
})



/**
 * @swagger
 * /api/v1/users:
 *   delete:
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user's id
 *         in: body
 *         required: true
 *         schema:
 *           properties:
 *             id:
 *               type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: user not found
 */
app.delete('/api/v1/users', function (req, res) {

    deleteusers.read(req, res);
    // eval(fs.readFileSync('mods/delete.js') + '');

})


   /**
 * @swagger
 * /api/v1/clone:
 *   put:
 *     description: Updates a single user
 *     produces: application/json
 *     parameters:
 *       - name: id
 *         description: user's id
 *         in: body
 *         required: true
 *         schema:
 *           properties:
 *             id:
 *               type: integer
 *     responses:
 *       201:
 *         description: Successfully updated
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: no such account
 */

app.put('/api/v1/clone', function (req, res) {

    putclone.read(req, res);
    // eval(fs.readFileSync('mods/clone.js') + '');

})


   /**
 * @swagger
 * /api/v1/clone_available:
 *   get:
 *     description: Returns the user to be cloned
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: returns a user
 *         schema:
 *           $ref: '#/definitions/user'
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: no such account
 */
app.get('/api/v1/clone_available', function (req, res) {

    getclone.read(req, res);
    // eval(fs.readFileSync('mods/clone_available.js') + '');

})
app.get('*', function (req, res) {

    error404.read(req, res);
    // eval(fs.readFileSync('mods/error_404.js') + '');

})

app.put('*', function (req, res) {

    error404.read(req, res);
    // eval(fs.readFileSync('mods/error_404.js') + '');

})

app.post('*', function (req, res) {

    error404.read(req, res);
    // eval(fs.readFileSync('mods/error_404.js') + '');

})

app.delete('*', function (req, res) {

    error404.read(req, res);
    // eval(fs.readFileSync('mods/error_404.js') + '');

})
app.listen(8080, () => console.log('App listening on port 8080!'))