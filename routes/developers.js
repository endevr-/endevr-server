var jwt       = require('jsonwebtoken');
var Developer = require('../api/developers/developers.model');
var verifyJwt = require('./../config/jwtValidation.js');

module.exports = function(app) {

  // List of all developers
  app.get('/api/developers', function(req, res, next) {
      res.send({languages: 'JavaScript, HTML, CSS', looking: 'yes' });
  });

  // Accepts post of user data
  app.post('/api/developers', function(req, res, next) {
    // console.log('Body: ', req.body);

    // Check if the service is LinkedIn
    if (req.body.service === 'LinkedIn'){

      var skillSet = [];
      var educationSet = [];
      var positionSet = [];

      for (var i=0; i< req.body.data.skills.values.length; i++){
        skillSet.push(req.body.data.skills.values[i].skill.name);
      }

      for (var i=0; i< req.body.data.educations.values.length; i++){
        educationSet.push({
            school: req.body.data.educations.values[i].schoolName,
            // year: req.body.data.educations.values[i].endDate.year,
            degree: req.body.data.educations.values[i].degree,
            field: req.body.data.educations.values[i].fieldOfStudy
          });
      }

      for (var i=0; i< req.body.data.positions.values.length; i++){
        positionSet.push({
            company: req.body.data.positions.values[i].company.name,
            //Add logic here to include Month in start and end dates
            //Need to handle edge cases where those values aren't provided
            // start: req.body.data.positions.values[i].startDate.year || '',
            // end: req.body.data.positions.values[i].endDate.year || '',
            title: req.body.data.positions.values[i].title,
            summary: req.body.data.positions.values[i].summary,
          });
      }

      new Developer({
        fname: req.body.data.firstName,
        lname: req.body.data.lastName,
        photo_url: req.body.data.pictureUrl,
        location: req.body.data.location.name,
        skills: skillSet,
        positions: positionSet,
        education: educationSet,
        linkedin: req.body.data.id,
        github: req.body.github || 'N/A',
        lastcard: req.body.lastcard || 0
      })
      .save().then(function(developer){
        res.send(developer.fname);
      }).catch(function(error) {
        console.log(error);
        res.send('An error occured', error);
      });

  // Check if the service is GitHub
    } else if(req.body.service === 'GitHub'){

      // console.log(req.body);
      res.send('GitHub');

    }

  });


  // This is off the assumption that we have obtained possible companies
  // from the database that the developer hasn't made a decision on.
  var possibleCards = [];

  for (var index = 0; index < 50; index++) {
    var company = {};
    company.name = 'company #'+index;
    company.image = 'http://www.farmvillefreak.com/farmville_images/facebook_farmville_freak_lobster_corgi_icon.png';
    possibleCards.push(company);
  }

  // List of all cards for developers
  app.get('/api/developers/:id/cards', verifyJwt, function(req, res, next) {
    res.send(possibleCards);
  });


};
