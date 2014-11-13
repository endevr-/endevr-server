var Employer      = require('../api/employers/employers.model');
var bcrypt        = require('bcrypt-nodejs');

module.exports = function(app) {

    // List of all employers
  app.get('/api/employers', function(req, res, next) {
    new Employer().fetchAll().then(function(employers){
      res.send(employers);
    })
  });

  // List of all cards for developers
  app.get('/api/employers/:id/cards', function(req, res, next) {
    res.send([{
      name: 'Jeff',
      image: 'http://www.clker.com/cliparts/b/8/0/d/11971143901626395792Steren_bike_rider_1.svg.med.png'
    }, {
      name: 'Josh',
      image: 'http://www.clker.com/cliparts/5/D/d/r/S/L/bearded-man-cartoon-hi.png'
    }, {
      name: 'Justin',
      image: 'http://licensedmentalhealthcounselor.files.wordpress.com/2012/03/cute_asian_cartoon_baby_sitting_up_wearing_diaper_with_big_smile_0515-1001-2911-4512_smu1.jpg'
    }, {
      name: 'Adam',
      image: 'http://static8.depositphotos.com/1499637/979/v/950/depositphotos_9794386-Trekking-boy..jpg'
    }, {
      name: 'BATMAN!',
      image: 'http://static.comicvine.com/uploads/original/11113/111136107/4058802-6025115082-31152.jpg'
    }]);
  });

  // Employer Login
  app.post('/api/employers/login', function(req, res, next) {
    new Employer({
      email: req.body.email
    }).fetch().then(function(employer) {
      if (!employer) {
        res.send('Invalid username.');
      }
      bcrypt.compare(req.body.password, employer.attributes.password,
        function(err, res) {
          if (res === false) {
            res.send('Incorrect password.');
          }
        });
      res.send({id: employer.id});
    });
  })

  // Create Employer
  app.post('/api/employers/new', function(req, res, next) {
    new Employer({
      email: req.body.email
    }).fetch().then(function(employer) {
      if (!employer) {
        bcrypt.hash(req.body.password, null, null, function(err, hash) {
          new Employer({
            email: req.body.email,
            password: hash
          }).save().then(function(employer) {
            res.send({id: employer.id});
          })
        });
      } else {
        res.send('Account already exists.');
      }
    })
  });

};