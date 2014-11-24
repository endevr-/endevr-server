var knex = require('./knex');

var config = {
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
}

knex.migrate.currentVersion(config).then( function(response) {
  if (response === 'none') {
    console.log('creating database.');
    knex.migrate.latest(config);
  }
});

var bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;
