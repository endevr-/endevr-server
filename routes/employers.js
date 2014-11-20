var Employer      = require('../api/employers/employers.model');
var Position      = require('../api/positions/positions.model');
var Match         = require('../api/matches/matches.model');
var knex          = require('../config/knex.js');
var bcrypt        = require('bcrypt-nodejs');
var jwt           = require('jsonwebtoken');
var verifyJwt = require('./../config/jwtValidation.js');

module.exports = function(app) {

  // Retrieve Employer's Developer Cards
  app.get('/api/employers/cards', verifyJwt, function(req, res) {
    knex.select('developers_id')
    .from('matches')
    .where({positions_id: req.query.posid, employer_interest: !null})
    .then(function(cards) {
      var developerIds = [];
      console.log(cards);
      for (var index = 0; index < cards.length; index++) {
        developerIds.push( cards[index].developers_id );
      }

      // console.log(cards);
      knex.select('*')
      .from('developers')
      .whereNotIn('id', developerIds)
      .then(function(positionCards) {
        console.log(positionCards);
        res.send(positionCards);
      })
    }).catch(function(error) {
      console.log(error);
      res.send('Error!', error);
    });
  });

  // Retrieve All Employer Matches
  app.get('/api/employers/matches', verifyJwt, function(req, res, next) {
    var devArray = [];
    new Match()
    .where({
      positions_id: req.query.posid,
      developer_interest: true,
      employer_interest: true
    })
    .fetchAll().then(function(match) {
      match = match.models;
      for(var i=0; i<match.length; i++){
        var dev = match[i].attributes.developers_id;
        devArray.push(dev);
      }
      knex.select('*').from('developers')
        .whereIn('id', devArray)
        .then(function(developers){
          console.log('here!',  developers);
          res.send(developers);
        })
    })
    .catch(function(error) {
      res.send('An error occured', error);
    });
  });

  // Update Employer Decision for a Match
  app.post('/api/employers/matches', verifyJwt, function(req, res, next) {
      new Match({developers_id: req.body.devid, positions_id: req.body.posid})
      .fetch()
      .then(function(match){
        if(!match){
          new Match({
            developers_id: req.body.devid,
            positions_id: req.body.posid,
            employer_interest: req.body.empint,
          }).save().then(function(match){
            res.send({id: match.id});
          }).catch(function(error){
            res.send(error);
          })
        } else {
          new Match({
            id: match.id,
            developers_id: req.body.devid,
            positions_id: req.body.posid,
            employer_interest: req.body.empint,
          }).save().then(function(match){
            res.send({id: match.id});
          }).catch(function(error){
            res.send(error);
          })
        }
      })
  });

  // Login Employer
  app.post('/api/employers/login', function(req, res, next) {
    var email = req.body.email.toLowerCase();
    new Employer({
      email: email
    }).fetch().then(function(employer) {
      if (!employer) {
        res.send('Invalid username.');
      } else {
        bcrypt.compare(req.body.password, employer.attributes.password,
          function(err, resp) {
            if (resp === false) {
              res.send('Incorrect password.');
            } else {
              jwt_token = jwt.sign({ id: employer.id}, 'lalala');
              res.send({jwt: jwt_token});
            }
          });
      }
    });
  })

  // Create Employer
  app.post('/api/employers/new', function(req, res, next) {
    var email = req.body.email.toLowerCase();
    console.log(email);
    new Employer({
      email: email
    }).fetch().then(function(employer) {
      if (!employer) {
        bcrypt.hash(req.body.password, null, null, function(err, hash) {
          new Employer({
            email: email,
            password: hash
          }).save().then(function(employer) {
            jwt_token = jwt.sign({ id: employer.id}, 'lalala');
            res.send({jwt: jwt_token});
          })
        });
      } else {
        res.send('Account already exists.');
      }
    })
  });

  // Retrieve Employer Profile
  app.get('/api/employers/profile', verifyJwt, function(req, res, next) {
    new Employer({ 'id': req.query.id })
    .fetch()
    .then(function(employer) {
      if (employer) {
        console.log(employer);
        res.status(200).send(employer);
      } else {
        // No profile Found
        res.send({});
      }
    });
  });

  // Update Employer Profile
  app.post('/api/employers/profile', verifyJwt, function(req, res, next) {
    console.log(req.body);
    new Employer({ 'id': req.query.id })
      .fetch()
      .then(function(employer) {
        if(employer) {

          console.log("Hit post to emp profile");

          var updatedData = {};
          updatedData[req.body.category] = req.body.data;

          new Employer({ id: req.query.id })
            .save(updatedData)
            .then(function(employer) {
              console.log('UPDATED!');
              res.send({'success': 'success'});
            }).catch(function(error) {
              res.send({'etrror': 'error'});
            });

        } else {
          console.log('user not found');
        }
      })
  });

  // Retrieve Employer Job Positiions
  app.get('/api/employers/positions', function(req, res, next) {
    var empArray = [];

    new Position()
    .where({
      employers_id: 102
    })
    .fetchAll().then(function(positions) {
      positions = positions.models;  
      for(var i=0; i<positions.length; i++){
        var emp = positions[i].attributes.employers_id;
        empArray.push(emp);
      }
      knex.select('*').from('employers')
        .whereIn('id', empArray)
        .then(function(employers){
          var employerMatches = [];
          for(var i = 0; i < positions.length; i++) {
            var job = positions[i].attributes;
            for(var e = 0; e < employers.length; e++) {
              var employer = employers[e];
              if(employer['id'] === job['employers_id']) {
                job['employerInfo'] = employer;
                break;
              }
            }
            employerMatches.push(job);
          }
          res.send(employerMatches);
        })
      })
    .catch(function(error) {
      res.send('An error occured', error);
    });
  });

  // Create Employer Job Position
  app.post('/api/employers/positions', verifyJwt, function(req, res, next) {
    new Position({
      id: req.body.id
    }).fetch().then(function(position) {
      if (!position) {
        new Position({
          employers_id: req.body.employers_id,
          position: req.body.position,
          location: req.body.location,
          required: req.body.required,
          preferred: req.body.preferred,
          salary: req.body.salary,
          description: req.body.description,
          time: req.body.time,
          company_size: req.body.company_size,
          lastcard: req.body.lastcard
        })
        .save().then(function(position){
          res.send({id: position.id});
        });
      } else {
        res.send('Already exists.');
      }
    });
  });

};
