var Developer = require('../api/developers/developers.model');

module.exports = function(app) {

// List of all developers
  app.get('/api/developers', function(req, res, next) {
    res.send({languages: 'JavaScript, HTML, CSS', looking: 'yes' });
  });

// Accepts post of user data
  app.post('/api/developers', function(req, res, next) {
    console.log('Body: ', req.body);
    new Developer({
      fname: req.body.data.firstName;
      lname: req.body.data.lastName,
      photo_url: req.body.data.pictureUrl;
      location: req.body.data.location.name,
      linkedin: req.body.data.id,
      github: req.body.github || 'N/A',
      auth: req.body.auth || 'N/A',
      lastcard: req.body.lastcard || 0
    })
    .save().then(function(developer){
      res.send(req.body.name);
    }).catch(function(error) {
      console.log(error);
      res.send('An error occured', error);
    });
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
