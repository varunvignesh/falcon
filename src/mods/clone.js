module.exports = {
    read: function (req, res) {

        const bookshelf = require('./bookshelf');
        let userstable = bookshelf.Model.extend({
            tableName: 'user'
        })

        let data = req.body.id;

        new userstable({ 'user_id': data }).fetch()
            .then(function (userexist) {

                if (userexist != null) {
                    let clonetable = bookshelf.Model.extend({
                        tableName: 'clone'
                    })
                    userexist = userexist.toJSON();
                    let idtobecloned = userexist.user_id;
                    let tobecloned = new clonetable({
                        id_to_be_cloned: idtobecloned
                    })
                    tobecloned.save().then(function (saved_article) {
                        res.setHeader('Content-Type', 'application/json');
                        let o = {
                            userMessage: "OK",
                            internalMessage: "New clone resource has been created",
                            code: 201
                        }
                        res.send(JSON.stringify(o));
                    }).catch(function (ex) {

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

            }).catch(function (ex) {
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
            connection.query('SELECT * FROM `user` WHERE user_id=' + data, function (err, rows, fields) {
                if (err) throw err
                if (rows.length > 0) {
                    connection.query('INSERT INTO `clone`(`id_to_be_cloned`) VALUES (' + data + ')', function (err, rows, fields) {
                        if (err) throw err
                        console.log('person successfully set to clone');
                    })
                    res.setHeader('Content-Type', 'application/json');
                    let o = {
                        userMessage: "OK",
                        internalMessage: "New clone resource has been created",
                        code: 201
                    }
                    res.send(JSON.stringify(o));
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