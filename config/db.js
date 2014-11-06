var knex = require('./knex')

knex.schema.hasTable('developers').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('developers', function(t) {
      t.increments('id').primary().notNullable;
      t.string('name').notNullable();
      t.string('location').notNullable();
      t.string('linkedin').notNullable();
      t.string('github').notNullable();
      t.string('auth').notNullable();
      t.string('lastcard').notNullable();
    }).then(function() {
      console.log('created developers table.');
    });
  } else {
    console.log('developers table already exists.');
  }
});

knex.schema.hasTable('employers').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('employers', function(t) {
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

knex.schema.hasTable('positions').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('positions', function(t) {
      t.increments('id').primary().notNullable;
      t.string('position').notNullable();
      t.string('location').notNullable();
      t.string('image');
      t.string('required').notNullable();
      t.string('prefered').notNullable();
      t.string('lastcard').notNullable();
    }).then(function() {
      console.log('created positions table.');
    });
  } else {
    console.log('positions table already exists.');
  }
});

knex.schema.hasTable('matches').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('matches', function(t) {
      t.increments('id').primary().notNullable;
      t.integer('developers_id').references('id').inTable('developers');
      t.integer('employers_id').references('id').inTable('employers');
    }).then(function() {
      console.log('created matches table.');
    });
  } else {
    console.log('matches table already exists.');
  }
});

var bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;