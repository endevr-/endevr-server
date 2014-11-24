'use strict';

var bcrypt = require('bcrypt-nodejs');
var testPW;

bcrypt.hash('test', null, null, function(err, hash) {
  testPW = hash;
});

exports.up = function(knex, Promise) {
  knex('employers').insert({
    email: 'test@test.com',
    password: testPW
  }).then(function() {
    console.log('created 1st test employer.');
  });

  knex('employers').insert({
    email: 'test2@test.com',
    password: testPW
  }).then(function() {
    console.log('created 2nd test employer.');
  });

  knex('developers').insert({
    fname: 'Kyser',
    lname: 'Soze',
    email: 'example@developer.com',
    location: 'San Francisco, CA'
  }).then(function() {
    console.log('created 1st test developer.');
  });

  knex('positions').insert({
    employers_id: 1,
    position: "Full Stack Software Engineer 1",
    location: "San Francisco, CA",
    required: "Ruby on Rails, Postgres",
    preferred: "Bookshelf, JavaScript, AngularJS",
    salary: "$100k",
    description: "Our company needs a full stack software engineer for our B2B platform.",
    time: "Full-Time",
    company_size: '100+'
  }).then(function() {
    console.log('created 1st position for employer1.');
  });

  knex('positions').insert({
    employers_id: 1,
    position: "Front End Web Developer 1",
    location: "San Francisco, CA",
    required: "HTML5, CSS3, JavaScript, Embedded Ruby",
    preferred: "jQuery, Bootstrap",
    salary: "$95k",
    description: "Our company needs a front end web developer for our B2B platform.",
    time: "Full-Time",
    company_size: '100+'
  }).then(function() {
    console.log('created 2nd position for employer1.');
  });

  knex('positions').insert({
    employers_id: 2,
    position: "Full Stack Software Engineer 2",
    location: "San Francisco, CA",
    required: "Node.js, Express, Mongodb",
    preferred: "Gulp.js, Mocha, Protractor",
    salary: "$115k",
    description: "Our company needs a full stack software engineer for our consumer facing platform.",
    time: "Full-Time",
    company_size: '60+'
  }).then(function() {
    console.log('created 1st position for employer2.');
  });

  knex('positions').insert({
    employers_id: 2,
    position: "Front End Web Developer 2",
    location: "San Francisco, CA",
    required: "AngularJS",
    preferred: "Bootstrap",
    salary: "$97k",
    description: "Our company needs a front end web developer for our consumer facing platform.",
    time: "Full-Time",
    company_size: '60+'
  }).then(function() {
    console.log('created 2nd position for employer2.');
  });

  knex('matches').insert({
    developers_id: 1,
    positions_id: 1,
    developer_interest: true,
    employer_interest: true
  }).then(function() {
    console.log("created 1st match for employer1's .");
  });

};

exports.down = function(knex, Promise) {

  knex('matches')
    .del()
    .then(function(result) {
      console.log('deleted matches table rows');
    });

  knex('employers')
    .del()
    .then(function(result) {
      console.log('deleted employers table rows');
    });

  knex('developers')
    .del()
    .then(function(result) {
      console.log('deleted developers table rows');
    });

  knex('positions')
    .del()
    .then(function(result) {
      console.log('deleted positions table rows');
    });


};
