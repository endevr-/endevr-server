var passport = require('passport');
var jwt = require('jsonwebtoken');
var Developer = require('../api/developers/developers.model');
var profileData;
var userData;

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

      profileData = profile._json;
      return done(null, profile);
    });
}));

var getOauthToken = function(req, res, next){
  var userToken = req.query.oauth_token;
  // var userId = req.query['userId'];
  var userToken = req.query['oauth_token'];
  var server_token = jwt.sign({foo: 'bar'}, 'lalala');
  
  // console.log(profileData);
  console.log('USER DATA: ', userData);
  new Developer({id: userData})
    .fetch()
      .then(function(developer){
        if(developer){
          new Developer({id: userData})
          .save({
            github_url: profileData.profile_url,
            github_photo: profileData.avatar_url,
            github_blog: profileData.blog,
            hireable: profileData.hireable,
            public_repos: profileData.public_repos,
            total_private_repos: profileData.total_private_repos,
            followers: profileData.followers,
            following: profileData.following,
            created_at: profileData.created_at,
            updated_at: profileData.updated_at,
            public_gists: profileData.public_gists},
            {
              patch: true
            }
          )
          .then(function(developer){
            console.log('SAVED!');
            console.log(developer);
            res.redirect('?oauth_token=' + server_token + '&userId=' + developer.id );
          }).catch(function(error){
            console.log(error);
            res.send('An error occured', error);
          })
        } else {
          console.log('user not found');
        }

      // }).catch(function(error) {
      //     console.log('user not found');
      //    });

  // res.redirect('?oauth_token=' + server_token + '&userId=' + 1 );
});
}

app.get('/auth/github', function(req, res, next){ userData = req.query['userId']; next();});
app.get('/auth/github', passport.authenticate('github', {state: 'SOME STATE'}));
app.get('/auth/github/callback', passport.authenticate('github', {state: 'SOME STATE'}));
app.get('/auth/github/callback', getOauthToken);

}
