var Developer = require('../api/developers/developers.model');

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
      auth: req.body.auth || 'N/A',
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

  // List of all cards for developers
  app.get('/api/developers/:id/cards', function(req, res, next) {
    res.send([{name: 'hooli', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSk9KBgQU_9o0KbYEVrtPKxzlpMTRuieqR5l8AWXAm5Wr7P00fnyw'},
              {name: 'google', image: 'https://www.google.com/images/srpr/logo11w.png' },
              {name: 'facebook', image: 'https://pbs.twimg.com/profile_images/3513354941/24aaffa670e634a7da9a087bfa83abe6_400x400.png' },
              {name: 'walmart', image: 'https://img.grouponcdn.com/coupons/svWS786jtP7X3Y2JHsBTRQ/walmart_com-500x500' },
              {name: 'hack reactor', image: 'https://jlau-bucket-1.s3.amazonaws.com/uploads/topic/image/14/hack_reactor.png' }]
            );
  });


};
