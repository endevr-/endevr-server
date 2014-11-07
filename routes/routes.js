var passport       = require('passport');

module.exports = function(app) {

// Run on all routes to allow origin
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
 });

// LINKED IN STRATEGY FOR OAUTH
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.use(new LinkedInStrategy({
          clientID: '75omjdr2z9uzpl',
          clientSecret: 'T5nt3O8QEsZXY8vR',
          callbackURL: "http://localhost:9000/auth/linkedin/callback",
          scope: ['r_emailaddress', 'r_fullprofile'],
          }, function(accessToken, refreshToken, profile, done) {
            console.log('Tokens Stuff: ', accessToken, ' ', refreshToken, ' ', profile, ' ', done);
            // asynchronous verification, for effect...
            process.nextTick(function () {
                //returns linkedin profile
              console.log(profile);
              return done(null, profile);
            });
              }
        ));

var secret = 'keyboardCat'

var getOauthToken = function(req, res, next){
  var userToken = req.query['oauth_token'];
  console.log('Inside OAUTH - userToken: ', userToken);
  var server_token = jwt.sign({})+ secret+ 43829;
  console.log('Inside OAUTH - JWT: ', server_token);
  res.redirect('?oauth_token=' + server_token + '?userID=' + 1 );
}

// Default route
  app.get('/', function(req, res, next) {
    res.send('endevr');
  });

// Linkedin route
  app.get('/auth/linkedin', passport.authenticate('linkedin'));
  app.get('/auth/linkedin/callback', passport.authenticate('linkedin'));
  app.get('/auth/linkedin/callback', getOauthToken);

// Wildcard route
  app.get('*', function(req, res, next) {
    res.send('404 - Not Found')
  })

};
