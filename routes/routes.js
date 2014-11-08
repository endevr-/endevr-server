var passport = require('passport');
var jwt = require('jsonwebtoken');

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

  // callback function will be ran once authentication is successful

  }, function(accessToken, refreshToken, profile, done) {
    console.log('Profile: ', profile);
    process.nextTick(function () {
      //returns linkedin profile
      return done(null, profile);
    });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var secret = 'keyboardCat'

var getOauthToken = function(req, res, next){
  var userToken = req.query['oauth_token'];
  var server_token = jwt.sign({foo: 'bar'}, 'lalala');
  // console.log('Inside OAUTH - JWT: ', server_token);
  console.log('Just before redirect');

  // this where we *SHOULD* store the user and corresponding oAuth tokens
  // in the database

  // is the full URL === http://localhost:9000/auth/linkedin/callback/?oauth_token=PLACEHOLDER&userId=PLACEHOLDER ?
  res.redirect('?oauth_token=' + server_token + '&userId=' + 1 );
}

// Default route
  app.get('/', function(req, res, next) {
    res.send('endevr');
  });

// Linkedin route

  // the route we direct users to when we want them to authenticate via linked in
  // i'm assuming that the this returns the URL that's needed by the client to provide
  // a way for the user to authenticate. (the URL contains a temporary oAuth token)
  app.get('/auth/linkedin', passport.authenticate('linkedin', {state: 'SOME STATE'}));

  // once a user is signed, linked in will invoke the callback provided on line 20
  // which will invoke the line below. this causes passport to send another POST request
  // to linked in with the temporary oAuth token as well as another "secret" token. Once
  // linked in verifies this POST request it returns the access token, refresh token, and profile.
  app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {state: 'SOME STATE'}));

  // invokes the endevr created strategy to create a jwt
  // and the jwt gets sent to the client
  app.get('/auth/linkedin/callback', getOauthToken);

// Wildcard route
  app.get('*', function(req, res, next) {
    res.send('404 - Not Found')
  })

};
