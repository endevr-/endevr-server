var passport = require('passport');
var jwt = require('jsonwebtoken');
var url = require('url');
var Developer = require('../api/developers/developers.model');


module.exports = function(app) {

// Run on all routes to allow origin
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization, Content-Length, X-Requested-With');
  var pathname = url.parse(req.url).pathname;

  if ( pathname === '/api/employers' ||
       pathname === '/api/developers' ||
       pathname === '/api/employers/:id/cards' ||
       pathname === '/api/developers/:id/cards' ) {

    if ( req.body.jwt && req.body.usertype ) {

      if (usertype === 'dev') {

        new Developer({ auth: req.body.jwt })
          .fetch()
          .then(function(developer) {

            if (developer) {

              jwt.verify(req.body.jwt, 'lalala', function(err, decoded) {
                if (err) { res.status(401).send('Not Authorized'); }

                  if (decoded.foo === 'bar') {
                    next();
                  } else {
                    res.status(401)
                       .send('Not Authorized');
                  }

              });
              next();
            } else {
              res.status(401)
                 .send('Not Authorized');
            }
          });
      } else {
        //employer logic
      }
    } else {
      res.status(401)
         .send('Not Authorized');
    }
  } else {
    next();
  }
 });

// Default route
  app.get('/', function(req, res, next) {
    res.send('endevr');
  });

// Wildcard route
  app.get('*', function(req, res, next) {
    res.status(404)
       .send('404 - Not Found');
  })

};
