module.exports = {
  read: function (req, res) {

    const bookshelf = require('./bookshelf');
    let users = bookshelf.Model.extend({
      tableName: 'user'
    })

    new users().fetchAll()
      .then(function (users) {
        if (users.length > 0) {
          res.setHeader('Content-Type', 'application/json');
          let o = {
            userMessage: "OK",
            internalMessage: "Eyerything is working",
            code: 200,
          };
          let key = 'account';
          o[key] = users;
          res.send(JSON.stringify(o));
        }
        else {
          res.setHeader('Content-Type', 'application/json');
          let str = {
            userMessage: "Not found",
            internalMessage: "No users found",
            code: 404
          }
          res.send(JSON.stringify(str));
        }
      }).catch(function (ex) {
        console.log(ex);
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

      connection.query('SELECT * FROM `user`', function (err, rows, fields) {
        if (err) throw err;
        console.log('users successfully fetched');
        let len = rows.length;
        res.setHeader('Content-Type', 'application/json');
        if (len > 0) {
          let o = {
            userMessage: "OK",
            internalMessage: "Eyerything is working",
            code: 200,
          };
          let key = 'account';
          o[key] = []; 
          

            for (let i = 0; i < len; i++) {
              let str = {
                "firstname": rows[i].firstname,
                "lastname": rows[i].lastname,
                "email": rows[i].email,
                "password": rows[i].password,
                "city": rows[i].city,
                "state": rows[i].state,
                "country": rows[i].country,
                "zip": rows[i].zipcode,
                "phnum": rows[i].phone,
                "alternateemail": rows[i].alteremail,
                "id": rows[i].user_id
              }
              o[key].push(str);
            }
          }
          res.send(JSON.stringify(o));
        }
        else {
          res.setHeader('Content-Type', 'application/json');
          let str = {
            userMessage: "Not found",
            internalMessage: "No users found",
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