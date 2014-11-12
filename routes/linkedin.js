var passport  = require('passport');
var jwt       = require('jsonwebtoken');
var Developer = require('../api/developers/developers.model');
var profileData;

module.exports = function(app) {
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.use(new LinkedInStrategy({
  clientID: '75omjdr2z9uzpl',
  clientSecret: 'T5nt3O8QEsZXY8vR',
  callbackURL: "http://localhost:9000/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_fullprofile'],
  // callback function will be ran once authentication is successful
  }, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      //returns linkedin profile
      profileData = profile;
      return done(null, profile);
    });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var getOauthToken = function(req, res, next){
  var userToken = req.query.oauth_token;
  var server_token = jwt.sign({foo: 'bar'}, 'lalala'); 

  new Developer({'linkedin': profileData.id})
  .fetch()
  .then(function(developer){
    if(developer){
      console.log('user already exists: ', {id: developer.id});
      res.redirect('?oauth_token=' + server_token + '&userId=' + developer.id ); 
    } else {  

        profile = profileData._json;

        var skills = {};
        if(profile.skills !== undefined){
          for(var i=0; i<profile.skills.values.length; i++){
            skills[i] = profile.skills.values[i].skill.name;
          }
        }
        var education = {};
        if(profile.educations._total !== 0){
          for(var i=0; i<profile.educations.values.length; i++){
            skills[i] = profile.educations.values[i].schoolName + ' - ' + profile.educations.values[i].degree;
          }
        }

        new Developer({
        fname: profile.firstName,
        lname: profile.lastName,
        location: profile.location.name,
        linkedin_url: profile.publicProfileUrl,
        photo_url: profile.pictureUrl,
        skills: skills,
        education: education,
        positions: 'places',
        linkedin: profile.id,
        github: null,
        auth: server_token,
        lastcard: '0'
      })
      .save().then(function(developer){
        console.log('SAVED!');
        res.redirect('?oauth_token=' + server_token + '&userId=' + developer.id );
      }).catch(function(error) {
        console.log(error);
        res.send('An error occured', error);
      });
    }
});
  // is the full URL === http://localhost:9000/auth/linkedin/callback/?oauth_token=PLACEHOLDER&userId=PLACEHOLDER ?
  // res.redirect('?oauth_token=' + server_token + '&userId=' + 1 );
}
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
}
