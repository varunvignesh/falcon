const express = require('express');
const app = express();
const myParser = require("body-parser");
const fs = require('fs');
const getusers = require('./mods/userdetails');
const getclone = require('./mods/clone_available');
const putclone = require('./mods/clone');
const deleteusers = require('./mods/delete');
const error404 = require('./mods/error_404');
const postusers = require('./mods/log_person');

app.use(myParser.urlencoded({ extended: true }));
app.use(myParser.json());
app.use(myParser.json({ type: 'application/vnd.api+json' }))

app.post('/api/v1/users', function (req, res) {

    postusers.read(req, res);
    // eval(fs.readFileSync('mods/log_person.js') + '');

})
app.get('/api/v1/users', function (req, res) {

    getusers.read(req, res);
    //eval(fs.readFileSync('mods/userdetails.js') + '');
})
app.delete('/api/v1/users', function (req, res) {

    deleteusers.read(req, res);
    // eval(fs.readFileSync('mods/delete.js') + '');

})
app.put('/api/v1/clone', function (req, res) {

    putclone.read(req, res);
    // eval(fs.readFileSync('mods/clone.js') + '');

})
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