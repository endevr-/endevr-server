var passport  = require('passport');
var jwt       = require('jsonwebtoken'); //potentially remove
var Developer = require('../api/developers/developers.model');
var gitHubKeys = require('../config/gitHubKeys');
var profileData;
var jwt_token;
var userId;

module.exports = function(app) {

var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
  clientID: gitHubKeys.id,
  clientSecret: gitHubKeys.secret,
  callbackURL: "http://localhost:9000/auth/github/callback",
  scope: ['user', 'repo', 'gist', 'read:org'],
  // callback function will be ran once authentication is successful
  }, function(accessToken, refreshToken, profile, done) {
    console.log('GitHub Profile: ', profile);
    process.nextTick(function () {

      profileData = profile._json;
      return done(null, profile);
    });
}));

var getOauthToken = function(req, res, next){
  // var userToken = req.query.oauth_token;
  jwt.verify(jwt_token, 'lalala', function(err, decoded) {
    if (err) { console.log(err); res.redirect('/unauthorized'); }
    userId = decoded.id;
  });

  // var server_token = jwt.sign({foo: 'bar'}, 'lalala'); //potentially remove

  new Developer({id: userId})
    .fetch()
      .then(function(developer){
        if(developer){
          new Developer({id: userId})
          .save({
            github_url: profileData.profile_url,
            github_photo: profileData.avatar_url,
            github_blog: profileData.blog,
            hireable: profileData.hireable,
            following: profileData.following,
            created_at: profileData.created_at,
            updated_at: profileData.updated_at,
            public_gists: profileData.public_gists,
            public_repos: profileData.public_repos},
            {
              patch: true
            }
          )
          .then(function(developer){
            console.log('SAVED!');
            console.log(developer);
            res.redirect('?userType=dev');
          }).catch(function(error){
            console.log(error);
            res.send('An error occured', error);
          })
        } else {
          console.log('user not found');
        }
  });
}

app.get('/auth/github', function(req, res, next){ jwt_token = req.query.jwt_token; next();});
app.get('/auth/github', passport.authenticate('github', {state: 'SOME STATE'}));
app.get('/auth/github/callback', passport.authenticate('github', {state: 'SOME STATE'}));
app.get('/auth/github/callback', getOauthToken);

}
