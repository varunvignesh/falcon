const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'vi',
        database: 'demo_1'
    }
});
module.exports = require('bookshelf')(knex);