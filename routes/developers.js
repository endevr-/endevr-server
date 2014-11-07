var Developer = require('../api/developers/developers.model');

module.exports = function(app) {

// List of all developers
  app.get('/api/developers', function(req, res, next) {
    res.send({languages: 'JavaScript, HTML, CSS', looking: 'yes' });
  });

// Accepts post of user data
  app.post('/api/developers', function(req, res, next) {
    console.log('Body: ', req.body);
    new Developer({
      name: req.body.name
    })
    .save().then(function(developer){
      res.send('return stuff here');
    }).catch(function(error) {
      console.log(error);
      res.send('An error occured', error);
    });
    next();
  });

};
