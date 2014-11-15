var knex = require('./knex');

knex.schema.hasTable('developers').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('developers', function(t) {
      t.increments('id').primary();
      //linkedin
      t.string('fname');
      t.string('lname');
      t.string('location');
      t.string('linkedin_url');
      t.string('photo_url');
      t.json('skills');
      t.json('education');
      t.json('positions');
      //github
      t.string('github_url');
      t.string('github_photo');
      t.string('github_blog');
      t.string('hireable');
      t.string('public_repos');
      t.string('total_private_repos');
      t.string('followers');
      t.string('following');
      t.string('created_at');
      t.string('updated_at');
      t.string('public_gists');
      t.string('linkedin');
      t.string('github');
      t.integer('lastcard');
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
      t.string('email').notNullable();
      t.string('password').notNullable();
      t.string('name');
      t.string('location');
      t.string('image');
      t.string('contact_person');
      t.string('contact_email');
      t.string('contact_phone');
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
      t.integer('lastcard').notNullable();
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
      t.boolean('developer_interest').defaultTo(null);
      t.boolean('employer_interest').defaultTo(null);
    }).then(function() {
      console.log('created matches table.');
    });
  } else {
    console.log('matches table already exists.');
  }
});

var bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;
