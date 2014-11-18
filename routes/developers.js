var jwt       = require('jsonwebtoken');
var Developer = require('../api/developers/developers.model');
var Position  = require('../api/positions/positions.model');
var Match     = require('../api/matches/matches.model');
var knex          = require('../config/knex.js');

var verifyJwt = require('./../config/jwtValidation.js');

module.exports = function(app) {

  // List of all developers
  app.get('/api/developers', function(req, res, next) {
      res.send({languages: 'JavaScript, HTML, CSS', looking: 'yes' });
  });

  app.get('/api/developers/profile', verifyJwt, function(req, res, next) {
    new Developer({ 'id': req.query.id })
    .fetch()
    .then(function(developer) {
      if (developer) {
        console.log(developer);
        res.status(200).send(developer);
      } else {
        // No profile Found
        res.send({});
      }
    });
  });

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

  // This is off the assumption that we have obtained possible companies
  // from the database that the developer hasn't made a decision on.
  var possibleCards = [];

  for (var index = 0; index < 50; index++) {
    var company = {};
    company.name = 'Company #'+index;
    company.image = 'http://mydomadesign.com/wp-content/uploads/2013/07/10C3.jpg';
    company.location = 'San Francisco';
    company.position = 'Software Engineer';
    company.salary = '$'+(Math.floor(Math.random() * 150))+','+'000';
    company.company_size = '100-200';
    possibleCards.push(company);
  }

  app.get('/api/developers/cards', verifyJwt, function(req, res, next) {
    knex.select('positions_id')
    .from('matches')
    .where({ developers_id: req.query.id, developer_interest: !null})
    .then(function(cards) {

      var positionIds = [];

      for (var index = 0; index < cards.length; index++) {
        positionIds.push( cards[index].positions_id );
      }

      console.log(cards);
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

    app.post('/api/developers/matches', verifyJwt, function(req, res, next) {
      new Match({developers_id: req.body.devid, positions_id: req.body.posid})
      .fetch()
      .then(function(match){
        if(!match){
          new Match({
            developers_id: req.body.devid,
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

  app.get('/api/developers/matches', verifyJwt, function(req, res, next) {
    var posArray = [];
    new Match()
    .where({
      developers_id: req.body.devid,
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
          console.log(positions);
          res.send(positions);
        })
    })
    .catch(function(error) {
      console.log(error);
      res.send('An error occured', error);
    });
  });

  // List of all cards for developers
  app.get('/api/developers/:id/cards', verifyJwt, function(req, res, next) {
    res.send(possibleCards);
  });

};
