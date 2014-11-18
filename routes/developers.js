var jwt       = require('jsonwebtoken');
var Developer = require('../api/developers/developers.model');
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

  // List of all cards for developers
  app.get('/api/developers/:id/cards', verifyJwt, function(req, res, next) {
    res.send(possibleCards);
  });

};
