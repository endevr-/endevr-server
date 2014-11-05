var knex = require('./knex')

knex.schema.hasTable('developers').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('users', function(t) {
      t.increments('id').primary().notNullable;
      t.string('name').notNullable();
      t.string('location').notNullable();
      t.string('linkedin').notNullable();
      t.string('github').notNullable();
      t.string('auth').notNullable();
    }).then(function() {
      console.log('created developers table.');
    });
  } else {
    console.log('developers table already exists.');
  }
});

knex.schema.hasTable('employers').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('companies', function(t) {
      t.increments('id').primary().notNullable;
      t.string('name').notNullable();
      t.string('location').notNullable();
      t.string('image');
    }).then(function() {
      console.log('created employers table.');
    });
  } else {
    console.log('employers table already exists.');
  }
});

var bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;