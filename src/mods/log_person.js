module.exports = {
  read: function (req, res) {

    const bookshelf = require('./bookshelf');
    let users = bookshelf.Model.extend({
      tableName: 'user'
    })

    let userdetails = req.body.account[0];


    new users({ 'email': userdetails.email }).fetch()
      .then(function (posts) {
        if (posts == null) {
          let person = new users({
            firstname: userdetails.firstname,
            lastname: userdetails.lastname,
            email: userdetails.email,
            password: userdetails.password,
            city: userdetails.city,
            state: userdetails.state,
            country: userdetails.country,
            zipcode: userdetails.zip,
            phone: userdetails.phnum,
            alteremail: userdetails.alternateemail
          });
          person.save().then(function (saved_article) {
            res.setHeader('Content-Type', 'application/json');
            let o = {
              userMessage: "OK",
              internalMessage: "New resource has been created",
              code: 201
            }
            res.send(JSON.stringify(o));
          }).catch(function (error) {
            console.log(error);
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
        } else {
          res.setHeader('Content-Type', 'application/json');
          let o = {
            userMessage: "Not Modified",
            internalMessage: "Email already exists",
            code: 304
          }
          res.send(JSON.stringify(o));
        }
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



    /* const mysql = require('mysql')
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'vi',
      database: 'demo_1'
    });

    try {
      let person = req.body.account[0];

      connection.query('SELECT * FROM `user` WHERE email= "' + person.email + '"', function (err, rows, fields) {
        if (err) throw err
        let len = rows.length;
        if (len == 0) {
          connection.query('INSERT INTO `user`(`firstname`, `lastname`, `email`, `password`, `city`, `state`, `country`, `zipcode`, `phone`, `alteremail`) VALUES ("' + person.firstname + '","' + person.lastname + '","' + person.email + '","' + person.password + '","' + person.city + '","' + person.state + '","' + person.country + '",' + person.zip + ',' + person.phnum + ',"' + person.alternateemail + '")', function (err, response, fields) {
            if (err) throw err
            console.log('person successfully logged');
            res.setHeader('Content-Type', 'application/json');
            let o = {
              userMessage: "OK",
              internalMessage: "New resource has been created",
              code: 201
            }
            res.send(JSON.stringify(o));

          })
        }
        else {
          res.setHeader('Content-Type', 'application/json');
          let o = {
            userMessage: "Not Modified",
            internalMessage: "Email already exists",
            code: 304
          }
          res.send(JSON.stringify(o));
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