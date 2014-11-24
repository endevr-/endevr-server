'use strict';

exports.up = function(knex, Promise) {
  knex.schema.createTable('matches', function(t) {
    t.increments('id').primary().notNullable;
    t.integer('developers_id').references('id').inTable('developers');
    t.integer('positions_id').references('id').inTable('positions');
    t.boolean('developer_interest').defaultTo(null);
    t.boolean('employer_interest').defaultTo(null);
  }).then(function() {
    console.log('created matches table.');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('matches').then(function() {});
};
