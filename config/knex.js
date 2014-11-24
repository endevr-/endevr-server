var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : process.env.HEROKU_HOST || '127.0.0.1',
    user     : process.env.HEROKU_USER || null,
    password : process.env.HEROKU_PASS || null,
    database : process.env.HEROKU_DB   || 'endevr',
    port:      process.env.HEROKU_PORT || 5432,
    ssl:       process.env.HEROKU_SSL  ||  false
  },
  directory: __dirname + './../migrations',
  tableName: 'migrations'
});

module.exports = knex;
