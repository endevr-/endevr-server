var Employer      = require('../api/employers/employers.model');
var Position      = require('../api/positions/positions.model');
var Match         = require('../api/matches/matches.model');
var knex          = require('../config/knex.js');
var bcrypt        = require('bcrypt-nodejs');
var jwt           = require('jsonwebtoken');
var verifyJwt = require('./../config/jwtValidation.js');


module.exports = function(app) {

    // List of all employers
  app.get('/api/employers', function(req, res, next) {
    new Employer().fetchAll().then(function(employers){
      res.send(employers);
    })
  });

  app.get('/api/employers/cards', verifyJwt, function(req, res) {
    knex.select('developers_id', '*')
    .from('matches')
      .fullOuterJoin('developers', 'developers.id', 'developers_id')
      .where({employer_interest: null}) //replace with req.body.something
    .then(function(cards) {
      var positionCards = [];
      for (var index = 0; index < cards.length; index++) {
        if (cards[index].positions_id === null || cards[index].positions_id === req.body.posId) { //req.body.posId
          cards[index].positions_id = req.body.posId; //req.body.posId;
          positionCards.push(cards[index]);
        }
      }
      res.send(positionCards);
    }).catch(function(error) {
      console.log(error);
      res.send('An error occured', error);
    });
  });

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
          prefered: req.body.prefered,
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
            positions_id: req.body.empid,
            employer_interest: req.body.empint,
          }).save().then(function(match){
            res.send({id: match.id});
          }).catch(function(error){
            res.send(error);
          })
        }
      })
  });

  app.get('/api/employers/matches', function(req, res, next) {
    new Match()
    .where({
      positions_id: 8,
      developer_interest: true,
      employer_interest: true
    })
    .fetchAll().then(function(match) {
      res.send(match);
    }).catch(function(error) {
      console.log(error);
      res.send('An error occured', error);
    });
  });

  // List of all cards for developers
  app.get('/api/employers/:id/cards', function(req, res, next) {
    res.send([{
      name: 'Jeff',
      profile: {
        skills: ['Backbone.js', 'Angular.js', 'Ionic', 'JavaScript', 'CoffeeScript'],
        public_repos: '26',
        education: ['University of Michigan', 'Michigan State University'],
        positions: ['Product Manager', 'Analyst', 'Associate', 'Intern']
      },
      image: 'http://www.clker.com/cliparts/b/8/0/d/11971143901626395792Steren_bike_rider_1.svg.med.png'
    }, {
      name: 'Josh',
      profile: {
        skills: ['Backbone.js', 'Angular.js', 'Ionic', 'JavaScript', 'CoffeeScript'],
        public_repos: '26',
        education: ['University of Michigan', 'Michigan State University'],
        positions: ['Product Manager', 'Analyst', 'Associate', 'Intern']
      },
      image: 'http://www.clker.com/cliparts/5/D/d/r/S/L/bearded-man-cartoon-hi.png'
    }, {
      name: 'Justin',
      profile: {
        skills: ['Backbone.js', 'Angular.js', 'Ionic', 'JavaScript', 'CoffeeScript'],
        public_repos: '26',
        education: ['University of Michigan', 'Michigan State University'],
        positions: ['Product Manager', 'Analyst', 'Associate', 'Intern']
      },
      image: 'http://licensedmentalhealthcounselor.files.wordpress.com/2012/03/cute_asian_cartoon_baby_sitting_up_wearing_diaper_with_big_smile_0515-1001-2911-4512_smu1.jpg'
    }, {
      name: 'Adam',
      profile: {
        skills: ['Backbone.js', 'Angular.js', 'Ionic', 'JavaScript', 'CoffeeScript'],
        public_repos: '26',
        education: ['University of Michigan', 'Michigan State University'],
        positions: ['Product Manager', 'Analyst', 'Associate', 'Intern']
      },
      image: 'http://static8.depositphotos.com/1499637/979/v/950/depositphotos_9794386-Trekking-boy..jpg'
    }, {
      name: 'BATMAN!',
      profile: {
        skills: ['Backbone.js', 'Angular.js', 'Ionic', 'JavaScript', 'CoffeeScript'],
        public_repos: '26',
        education: ['University of Michigan', 'Michigan State University'],
        positions: ['Product Manager', 'Analyst', 'Associate', 'Intern']
      },
      image: 'http://static.comicvine.com/uploads/original/11113/111136107/4058802-6025115082-31152.jpg'
    }]);
  });

  // Employer Login
  app.post('/api/employers/login', function(req, res, next) {
    var email = req.body.email.toLowerCase();
    new Employer({
      email: email
    }).fetch().then(function(employer) {
      if (!employer) {
        res.send('Invalid username.');
      }
      bcrypt.compare(req.body.password, employer.attributes.password,
        function(err, resp) {
          if (resp === false) {
            res.send('Incorrect password.');
          } else {
            jwt_token = jwt.sign({ id: employer.id }, 'lalala');
            res.send({jwt: jwt_token});
          }
        });
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
            jwt_token = jwt.sign({ id: employer.id }, 'lalala');
            res.send({jwt: jwt_token});
          })
        });
      } else {
        res.send('Account already exists.');
      }
    })
  });


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
};
