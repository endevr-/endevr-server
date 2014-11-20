var jwt       = require('jsonwebtoken');
var Developer = require('../api/developers/developers.model');
var Position  = require('../api/positions/positions.model');
var Match     = require('../api/matches/matches.model');
var knex          = require('../config/knex.js');

var verifyJwt = require('./../config/jwtValidation.js');

module.exports = function(app) {

  // Retrieve Developer's Opportunity Cards
  app.get('/api/developers/cards', verifyJwt, function(req, res, next) {
    knex.select('positions_id')
    .from('matches')
    .where({ developers_id: req.query.id, developer_interest: !null})
    .then(function(cards) {

      var positionIds = [];

      for (var index = 0; index < cards.length; index++) {
        positionIds.push( cards[index].positions_id );
      }

      // console.log(cards);
      knex.select('*')
      .from('positions')
      .whereNotIn('id', positionIds)
      .then(function(positionCards) {
        res.send(positionCards);
      })
    }).catch(function(error) {
      console.log(error);
      res.send('Error!', error);
    });

  });

  // Update Developer Decision for a Match
  app.post('/api/developers/matches', verifyJwt, function(req, res, next) {
    new Match({developers_id: req.body.devid, positions_id: req.body.posid})
    .fetch()
    .then(function(match){
      if(!match){
        new Match({
          developers_id: req.query.id,
          positions_id: req.body.posid,
          developer_interest: req.body.devint,
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
          developer_interest: req.body.devint,
        }).save().then(function(match){
          res.send({id: match.id});
        }).catch(function(error){
          res.send(error);
        })
      }
    })
  });

  // Retrieve All Developer Matches
  app.get('/api/developers/matches', verifyJwt, function(req, res, next) {
    var posArray = [];
    var empArray = [];
    new Match()
    .where({
      developers_id: req.query.id,
      developer_interest: true,
      employer_interest: true
    })
    .fetchAll().then(function(match) {
      match = match.models;
      for(var i=0; i<match.length; i++){
        var pos = match[i].attributes.positions_id;
        posArray.push(pos);
      }
      knex.select('*').from('positions')
        .whereIn('id', posArray)
        .then(function(positions){
          // res.send(positions);
          for(var i=0; i<positions.length; i++){
            var emp = positions[i].employers_id;
            empArray.push(emp);
          }

          knex.select('*').from('employers')
            .whereIn('id', empArray)
            .then(function(employers){
              var employerMatches = [];

              for(var i = 0; i < positions.length; i++) {
                var job = positions[i];
                
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
    })
    .catch(function(error) {
      console.log(error);
      res.send('An error occured', error);
    });
  });

  // Retrieve Developer Profile
  app.get('/api/developers/profile', verifyJwt, function(req, res, next) {
    new Developer({ 'id': req.query.id })
    .fetch()
    .then(function(developer) {
      if (developer) {
        res.status(200).send(developer);
      } else {
        // No profile Found
        res.send({});
      }
    });
  });

  // Update Developer Profile
  app.post('/api/developers/profile', verifyJwt, function(req, res, next) {
    new Developer({ 'id': req.query.id })
      .fetch()
      .then(function(developer) {
        if(developer) {

          var updatedData = {};
          updatedData[req.body.category] = req.body.data;

          new Developer({ id: req.query.id })
            .save(updatedData)
            .then(function(developer) {
              console.log('UPDATED!');
              res.send('Success!');
            }).catch(function(error) {
              res.send('An error occured', error);
            });

        } else {
          console.log('user not found');
        }
      })
  });

};
