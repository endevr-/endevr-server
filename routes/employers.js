module.exports = function(app) {

// List of all employers
  app.get('/api/employers', function(req, res, next) {
    res.send({name: 'hooli', hiring: 'yes' });
  });

  // List of all cards for developers
  app.get('/api/employers/:id/cards', function(req, res, next) {
    res.send([{name: 'Jeff', image: 'http://www.clker.com/cliparts/b/8/0/d/11971143901626395792Steren_bike_rider_1.svg.med.png'}, 
              {name: 'Josh', image: 'http://www.clker.com/cliparts/5/D/d/r/S/L/bearded-man-cartoon-hi.png' }, 
              {name: 'Justin', image: 'http://licensedmentalhealthcounselor.files.wordpress.com/2012/03/cute_asian_cartoon_baby_sitting_up_wearing_diaper_with_big_smile_0515-1001-2911-4512_smu1.jpg' }, 
              {name: 'Adam', image: 'http://static8.depositphotos.com/1499637/979/v/950/depositphotos_9794386-Trekking-boy..jpg' }, 
              {name: 'BATMAN!', image: 'http://static.comicvine.com/uploads/original/11113/111136107/4058802-6025115082-31152.jpg' }]
            );
  });  

};