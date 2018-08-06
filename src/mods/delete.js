module.exports = {
    read: function (req, res) {

        const bookshelf = require('./bookshelf');
        let users = bookshelf.Model.extend({
            tableName: 'user'
        })

        let data = req.body.id;

        new users({ 'user_id': data }).fetch()
            .then(function (userexist) {
                if (userexist != null) {
                    users.where('user_id', data).destroy();
                    res.setHeader('Content-Type', 'application/json');
                    let str = {
                        userMessage: "OK",
                        internalMessage: "The resource was successfully deleted",
                        code: 204
                    }
                    res.status(204)
                    res.send(JSON.stringify(str));
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    let str = {
                        userMessage: "Not found",
                        internalMessage: "No such account",
                        code: 404
                    }
                    res.status(404)
                    res.send(JSON.stringify(str));
                }

            }).catch(function () {
                res.setHeader('Content-Type', 'application/json');
                let error = {
                    "errors": [
                        {
                            "userMessage": "Internal Server Error",
                            "internalMessage": ex,
                            "code": 500,
                            "more info": "http://localhost/gmaps/ind.html"
                        }
                    ]

                }
                res.status(500)
                res.send(JSON.stringify(error));
            });

        /* const mysql = require('mysql')
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'vi',
            database: 'demo_1'
        });

        let data = req.body.id;
        try {
            connection.query('SELECT * FROM `user` WHERE user_id = ' + data, function (err, rows, fields) {
                if (err) throw err
                if (rows.length > 0) {

                    connection.query('DELETE FROM `user` WHERE user_id =' + data, function (err, row, fields) {
                        if (err) throw err
                        console.log('person successfully Deleted');
                        res.setHeader('Content-Type', 'application/json');
                        let str = {
                            userMessage: "OK",
                            internalMessage: "The resource was successfully deleted",
                            code: 204
                        }
                        res.send(JSON.stringify(str));
                    })
                }
                else {
                    res.setHeader('Content-Type', 'application/json');
                    let str = {
                        userMessage: "Not found",
                        internalMessage: "No such account",
                        code: 404
                    }
                    res.send(JSON.stringify(str));
                }
            })
        } catch (ex) {
            res.setHeader('Content-Type', 'application/json');
            let error = {
                "errors": [
                    {
                        "userMessage": "Internal Server Error",
                        "internalMessage": ex,
                        "code": 500,
                        "more info": "http://localhost/gmaps/ind.html"
                    }
                ]

            }
            res.send(JSON.stringify(error));
        } */
    }
}