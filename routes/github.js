var passport = require('passport');
var jwt = require('jsonwebtoken');

module.exports = function(app) {

var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
  clientID: 'd228adcb4ead3cd56858',
  clientSecret: '0cb1bbb292a4f51dedc35565d855dd48ccf5b8f3',
  callbackURL: "http://localhost:9000/auth/github/callback",
  scope: ['user', 'repo', 'gist', 'read:org'],

  // callback function will be ran once authentication is successful

  }, function(accessToken, refreshToken, profile, done) {
    console.log('GitHub Profile: ', profile);
    process.nextTick(function () {
      //returns github profile
      return done(null, profile);
    });
}));

var getOauthToken = function(req, res, next){
  var userToken = req.query['oauth_token'];
  var server_token = jwt.sign({foo: 'bar'}, 'lalala');
  console.log('Just before redirect');
  res.redirect('?oauth_token=' + server_token + '&userId=' + 1 );
}

app.get('/auth/github', passport.authenticate('github', {state: 'SOME STATE'}));
app.get('/auth/github/callback', passport.authenticate('github', {state: 'SOME STATE'}));
app.get('/auth/github/callback', getOauthToken);

}