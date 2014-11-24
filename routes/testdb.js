var Employer      = require('../api/employers/employers.model');
var Position      = require('../api/positions/positions.model');
var Developer     = require('../api/developers/developers.model');
var Match         = require('../api/matches/matches.model');
var knex          = require('../config/knex.js');
var bcrypt        = require('bcrypt-nodejs');

var newPosition;

module.exports = function(app) {

  // knex('developers')
  //   .whereNotIn('email', ['example@developer.com'])
  //   .del()
  //   .then(function(result) {
  //       console.log("deleted developers except for 1");
  //   });
  //
  // knex('employers')
  //   .whereNotIn('email', ['test@test.com', 'test2@test.com'])
  //   .del()
  //   .then(function(result) {
  //       console.log("deleted employers except for 2");
  //   });
  //
  // knex('positions')
  //   .whereNotIn('position', ['Full Stack Software Engineer 1', 'Front End Web Developer 1', 'Full Stack Software Engineer 2', 'Front End Web Developer 2'])
  //   .del()
  //   .then(function(result) {
  //     console.log("deleted positions except for 1");
  //   });
  //
  // knex('matches')
  //   .whereNotIn('developers_id', [1]).orWhereNotIn('positions_id', [1])
  //   .del().then(function(result) {
  //     console.log("deleted matches except for 1");
  //   });
  //
  // var testPW;
  //
  // bcrypt.hash('test', null, null, function(err, hash) {
  //   testPW = hash;
  // });
  //
  // new Employer({
  //   email: 'test@test.com',
  //   })
  //   .fetch()
  //   .then(function(employer) {
  //
  //     if (!employer) {
  //       new Employer({
  //         email: 'test@test.com',
  //         password: testPW
  //       })
  //       .save()
  //       .then(function(newEmployer) {
  //         // console.log("employer created! " + newEmployer.id);
  //         employer = newEmployer;
  //       })
  //     }
  //
  //     var foundPosition;
  //
  //     new Position({
  //       employers_id: employer.id,
  //       position: "Full Stack Software Engineer 1",
  //       location: "San Francisco, CA",
  //       required: "Ruby on Rails, Postgres",
  //       preferred: "Bookshelf, JavaScript, AngularJS",
  //       salary: "$100k",
  //       description: "Our company needs a full stack software engineer for our B2B platform.",
  //       time: "Full-Time",
  //       company_size: '100+'
  //     })
  //       .fetch()
  //       .then(function(position) {
  //         if (!position) {
  //           new Position({
  //             employers_id: employer.id,
  //             position: "Full Stack Software Engineer 1",
  //             location: "San Francisco, CA",
  //             required: "Ruby on Rails, Postgres",
  //             preferred: "Bookshelf, JavaScript, AngularJS",
  //             salary: "$100k",
  //             description: "Our company needs a full stack software engineer for our B2B platform.",
  //             time: "Full-Time",
  //             company_size: '100+'
  //           }).save().then(function(newPosition) {
  //             foundPosition = newPosition;
  //           });
  //         } else {
  //           foundPosition = position;
  //         }
  //       })
  //         .then(function() {
  //           new Developer({
  //             fname: 'Kyser',
  //             lname: 'Soze'
  //           })
  //             .fetch()
  //             .then(function(developer) {
  //               if (!developer) {
  //                 new Developer({
  //                   fname: 'Kyser',
  //                   lname: 'Soze',
  //                   email: 'example@developer.com',
  //                   location: 'San Francisco, CA'
  //                 })
  //                 .save()
  //                 .then(function(newDeveloper) {
  //                   // console.log("developer created! " + newDeveloper.id);
  //                   developer = newDeveloper;
  //
  //                   new Match({
  //                     developers_id: developer.id,
  //                     positions_id: foundPosition.id,
  //                     developer_interest: true,
  //                     employer_interest: true,
  //                   })
  //                   .save().then(function(match1){
  //                     // console.log('match created! ' + match1.id);
  //                   });
  //                 });
  //               } else {
  //                 new Match({
  //                   developers_id: developer.id,
  //                   positions_id: foundPosition.id,
  //                   developer_interest: true,
  //                   employer_interest: true,
  //                 })
  //                 .save().then(function(match1){
  //                   // console.log('match created! ' + match1.id);
  //                 });
  //               }
  //
  //             });
  //         });
  //
  //
  //     new Position({
  //       employers_id: employer.id,
  //       position: "Front End Web Developer 1",
  //       location: "San Francisco, CA",
  //       required: "HTML5, CSS3, JavaScript, Embedded Ruby",
  //       preferred: "jQuery, Bootstrap",
  //       salary: "$95k",
  //       description: "Our company needs a front end web developer for our B2B platform.",
  //       time: "Full-Time",
  //       company_size: '100+'
  //     })
  //     .save().then(function(position2){
  //       // console.log('position created! ' + position2.id);
  //     });
  // });
  //
  // new Employer({
  //   email: 'test2@test.com',
  //   })
  //   .fetch()
  //   .then(function(employer) {
  //
  //     if (!employer) {
  //       new Employer({
  //         email: 'test2@test.com',
  //         password: testPW
  //       }).save().then(function(newEmployer) {
  //         // console.log("employer created! " + newEmployer.id);
  //         employer = newEmployer;
  //       })
  //     }
  //
  //     new Position({
  //       employers_id: employer.id,
  //       position: "Full Stack Software Engineer 2",
  //       location: "San Francisco, CA",
  //       required: "Node.js, Express, Mongodb",
  //       preferred: "Gulp.js, Mocha, Protractor",
  //       salary: "$115k",
  //       description: "Our company needs a full stack software engineer for our consumer facing platform.",
  //       time: "Full-Time",
  //       company_size: '60+'
  //     })
  //     .save().then(function(position){
  //       // console.log('position created! ' + position.id);
  //     });
  //
  //     new Position({
  //       employers_id: employer.id,
  //       position: "Front End Web Developer 2",
  //       location: "San Francisco, CA",
  //       required: "AngularJS",
  //       preferred: "Bootstrap",
  //       salary: "$97k",
  //       description: "Our company needs a front end web developer for our consumer facing platform.",
  //       time: "Full-Time",
  //       company_size: '60+'
  //     })
  //     .save().then(function(position2){
  //       // console.log('position created! ' + position2.id);
  //     });
  // });
};
