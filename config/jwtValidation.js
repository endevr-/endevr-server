var jwt       = require('jsonwebtoken');
var Developer = require('../api/developers/developers.model');
var Employer  = require('../api/employers/employers.model');

var jwtValidation = function(req, res, next) {
  var token = req.query.oauth_token;
  var usertype = req.query.usertype;
  console.log('token: ' + token);
  console.log('type: ' + usertype);

  if ( token && usertype ) {

    if (usertype === 'dev') {

      new Developer({ auth: token })
        .fetch()
        .then(function(developer) {

          if (developer) {

            jwt.verify(token, 'lalala', function(err, decoded) {
              if (err) { res.redirect('/unauthorized'); }

                if (decoded.foo === 'bar') {
                  next();
                } else {
                  res.redirect('/unauthorized');
                }

            });

          } else {
            res.redirect('/unauthorized');
          }
        });

    } else {

      new Employer({ auth: token })
        .fetch()
        .then(function(employer) {

          if (employer) {

            jwt.verify(token, 'lalala', function(err, decoded) {
              if (err) { res.redirect('/unauthorized'); }

                if (decoded.foo === 'bar') {
                  next();
                } else {
                  res.redirect('/unauthorized');
                }

            });

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
