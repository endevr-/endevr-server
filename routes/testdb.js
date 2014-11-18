var Employer      = require('../api/employers/employers.model');
var Position      = require('../api/positions/positions.model');
var Match         = require('../api/matches/matches.model');
var knex          = require('../config/knex.js');
var bcrypt        = require('bcrypt-nodejs');

module.exports = function(app) {

knex('employers')
  .del()
  .then(function(result) {
    console.log("deleted employers");
  });
knex('positions')
  .del()
  .then(function(result) {
    console.log("deleted positions");
  });
knex('matches')
  .del().then(function(result) {
    console.log("deleted matches");
  });

var testPW;
var employer1;
var employer2;

bcrypt.hash('test', null, null, function(err, hash) {
  testPW = hash;
  new Employer({
    email: 'test@test.com',
    password: testPW
  }).save().then(function(employer) {
    console.log('employer created! ' + employer.id);
    employer1 = employer.id;
    new Position({
      employers_id: employer1,
      position: "Full Stack",
      location: "SF",
      required: "skillz dat killz",
      prefered: "shoop da woop",
      salary: "$2",
      description: "chyea boi!",
      time: "huh?",
      company_size: 2,
      lastcard: 0
    })
    .save().then(function(position){
      console.log('position created! ' + position.id);
    });

    new Position({
      employers_id: employer1,
      position: "Half Stack",
      location: "SF",
      required: "half skillz dat killz",
      prefered: "half shoop da woop",
      salary: "$1",
      description: "kinda boi!",
      time: "huh?",
      company_size: 1,
      lastcard: 0
    })
    .save().then(function(position2){
      console.log('position created! ' + position2.id);
    });
  });

  new Employer({
    email: 'test2@test.com',
    password: testPW
  }).save().then(function(employer2) {
    console.log('employer created! ' + employer2.id);
    employer2 = employer2.id;
    new Position({
      employers_id: employer2,
      position: "UX Design",
      location: "SF",
      required: "what?",
      prefered: "lame",
      salary: "$0.25",
      description: "poop",
      time: "huh?",
      company_size: 2,
      lastcard: 0
    })
    .save().then(function(position){
      console.log('position created! ' + position.id);
    });

    new Position({
      employers_id: employer2,
      position: "Product Manager",
      location: "SF",
      required: "lol nothing",
      prefered: "zing",
      salary: "$0.001",
      description: "kinda boi!",
      time: "huh?",
      company_size: 1,
      lastcard: 0
    })
    .save().then(function(position2){
      console.log('position created! ' + position2.id);
    });
  });

});

};
