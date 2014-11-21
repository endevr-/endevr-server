var passport  = require('passport');
var jwt       = require('jsonwebtoken');
var Developer = require('../api/developers/developers.model');
var linkedInKeys = require('../config/LinkedInKeys');
var profileData;

module.exports = function(app) {
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_ID || linkedInKeys.id,
  clientSecret: process.env.LINKEDIN_SECRET || linkedInKeys.secret,
  callbackURL: process.env.HEROKU_URL || "http://localhost:9000/auth/linkedin/callback",
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
  var jwt_token;

  new Developer({'linkedin': profileData.id})
  .fetch()
  .then(function(developer){

    if(developer){

      console.log('user already exists: ', {id: developer.id});

      jwt_token = jwt.sign({ id: developer.id}, 'lalala');

      res.redirect('?jwt_token=' + jwt_token + '&userType=dev&isReturning=yes');

    } else {

        profile = profileData._json;

        // console.log(profile);

        var skills = {};
        if(profile.skills !== undefined){
          for(var i=0; i<profile.skills.values.length; i++){
            skills[i] = profile.skills.values[i].skill.name;
          }
        }
        var education = {};
        if(profile.educations._total !== 0){
          for(var i=0; i<profile.educations.values.length; i++){
            if (profile.educations.values[i].fieldOfStudy === undefined) {
              education[i] = profile.educations.values[i].schoolName;
            } else {
              education[i] = profile.educations.values[i].schoolName + ' - ' + profile.educations.values[i].fieldOfStudy;
            }
          }
        }

        var positions = {};
        if(profile.positions._total !== 0){
          for(var i=0; i<profile.positions.values.length; i++) {
            positions[i] =  profile.positions.values[i].company.name + ' - ' + profile.positions.values[i].title;
          }
        }

        new Developer({
          fname: profile.firstName,
          lname: profile.lastName,
          email: profile.emailAddress,
          location: profile.location.name,
          linkedin_url: profile.publicProfileUrl,
          photo_url: profile.pictureUrl,
          skills: skills,
          education: education,
          positions: positions,
          linkedin: profile.id,
          github: null
        })
        .save().then(function(developer){
          console.log('NEW USER SAVED!');

          jwt_token = jwt.sign({ id: developer.id}, 'lalala');

          res.redirect('?jwt_token=' + jwt_token + '&userType=dev');

        }).catch(function(error) {

          console.log(error);
          res.send('An error occured', error);

        });
    }
});

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
