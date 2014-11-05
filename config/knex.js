var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : null,
    password : null,
    database : 'endevr',
    port:      5432,
    ssl:       false
  }
});

module.exports = knex;