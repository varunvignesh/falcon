module.exports = {
    read: function (req, res) {

        const bookshelf = require('./bookshelf');

        let clone = bookshelf.Model.extend({
            tableName: 'clone'
        })

        new clone().fetchAll()
            .then(function (tobecloned) {

                if (tobecloned.length > 0) {
                    let data = tobecloned.toJSON();
                    let user_id = data[0].id_to_be_cloned;
                    let users = bookshelf.Model.extend({
                        tableName: 'user'
                    })

                    new users().where('user_id', user_id)
                        .fetch()
                        .then(function (usertobecloned) {
                            res.setHeader('Content-Type', 'application/json');
                            let o = {
                                userMessage: "OK",
                                internalMessage: "Account ready to be cloned",
                                code: 200
                            }
                            let key = 'account';
                            let data2 = usertobecloned.toJSON();
                            o[key] = data2;
                            clone.forge().where('id_to_be_cloned', user_id)
                                .fetch()
                                .then(function (clone) {
                                    clone.where('id_to_be_cloned', user_id).destroy();
                                    res.send(JSON.stringify(o));
                                }).catch(function (ex) {
                                    res.setHeader('Content-Type', 'application/json');
                                    let error = {
                                        "errors": [
                                            {
                                                "userMessage": "Internal Server ErrorS",
                                                "internalMessage": ex,
                                                "code": 500,
                                                "more info": "http://localhost/gmaps/ind.html"
                                            }
                                        ]
                                    }
                                    res.send(JSON.stringify(error));
                                })


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

            })
    }
}


        /* const mysql = require('mysql')
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'vi',
            database: 'demo_1'
        }); */

        /* try {
            connection.query('SELECT * FROM `clone`', function (err, rows, fields) {
                if (err) throw err
                if (rows.length > 0) {

                    let data = rows[0].id_to_be_cloned;
                    connection.query('SELECT * FROM `user` WHERE user_id =' + data, function (err, row, fields) {
                        if (err) throw err
                        res.setHeader('Content-Type', 'application/json');
                        let o = {
                            userMessage: "OK",
                            internalMessage: "Account ready to be cloned",
                            code: 200
                        }
                        let key = 'account';
                        o[key] = [];
                        let str = {
                            "firstname": row[0].firstname,
                            "lastname": row[0].lastname,
                            "email": row[0].email,
                            "password": row[0].password,
                            "city": row[0].city,
                            "state": row[0].state,
                            "country": row[0].country,
                            "zip": row[0].zipcode,
                            "phnum": row[0].phone,
                            "alternateemail": row[0].alteremail,
                        }
                        o[key].push(str);
                        res.send(JSON.stringify(o));
                        connection.query('DELETE FROM `clone` WHERE id_to_be_cloned =' + data, function (err, row, fields) {
                            if (err) throw err
                        })
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
        }*/