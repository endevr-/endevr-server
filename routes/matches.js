module.exports = function(app) {
// List of all cards
  app.get('/api/matches', function(req, res, next) {
    res.send([{name: 'hooli', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSk9KBgQU_9o0KbYEVrtPKxzlpMTRuieqR5l8AWXAm5Wr7P00fnyw'}, 
              {name: 'google', image: 'https://www.google.com/images/srpr/logo11w.png' }, 
              {name: 'facebook', image: 'https://pbs.twimg.com/profile_images/3513354941/24aaffa670e634a7da9a087bfa83abe6_400x400.png' }, 
              {name: 'walmart', image: 'https://img.grouponcdn.com/coupons/svWS786jtP7X3Y2JHsBTRQ/walmart_com-500x500' }, 
              {name: 'hack reactor', image: 'https://jlau-bucket-1.s3.amazonaws.com/uploads/topic/image/14/hack_reactor.png' }]
            );
  });

};