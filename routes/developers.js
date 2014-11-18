var jwt       = require('jsonwebtoken');
var Developer = require('../api/developers/developers.model');
var Match     = require('../api/matches/matches.model');

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
    company.name = 'company #'+index;
    company.image = 'http://www.farmvillefreak.com/farmville_images/facebook_farmville_freak_lobster_corgi_icon.png';
    possibleCards.push(company);
  }

  app.get('/api/developers/cards', verifyJwt, function(req, res, next) {

  });

    app.post('/api/developers/matches', function(req, res, next) {
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

  app.get('/api/developers/matches', function(req, res, next) {
    new Match()
    .where({
      developers_id: 1,
      developer_interest: true,
      employer_interest: true
    })
    .fetchAll().then(function(match) {
      res.send(match.toJSON());
    }).catch(function(error) {
      console.log(error);
      res.send('An error occured', error);
    });
  });

  // List of all cards for developers
  app.get('/api/developers/:id/cards', verifyJwt, function(req, res, next) {
    res.send(possibleCards);
  });

};
