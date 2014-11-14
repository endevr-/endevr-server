var jwt       = require('jsonwebtoken');
var Developer = require('../api/developers/developers.model');
var Employer  = require('../api/employers/employers.model');

var jwtValidation = function(req, res, next) {
  var token = req.query.jwt_token || req.body.jwt_token;
  var usertype = req.query.usertype || req.body.usertype;
  var id;

  console.log('token: ' + token);
  console.log('type: ' + usertype);


  if ( token && usertype ) {
    jwt.verify(token, 'lalala', function(err, decoded) {
      if (err) { res.redirect('/unauthorized'); }

      if (decoded.id) {
        id = decoded.id;
      } else {
        res.redirect('/unauthorized');
      }

    });

    if (usertype === 'dev') {

      new Developer({ id: id })
        .fetch()
        .then(function(developer) {

          if (developer) {
            req.query.id = developer.id;
            next();
          } else {
            res.redirect('/unauthorized');
          }
        });

    } else {

      new Employer({ id: id })
        .fetch()
        .then(function(employer) {
          if (employer) {
            req.query.id = employer.id;
            next();
          } else {
            res.redirect('/unauthorized');
          }
        });

    }
  } else {
    res.redirect('/unauthorized');
  }
};

module.exports = jwtValidation;
