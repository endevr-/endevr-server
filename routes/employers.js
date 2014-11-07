module.exports = function(app) {
// List of all employers
  app.get('/api/employers', function(req, res, next) {
    res.send({name: 'hooli', hiring: 'yes' });
  });

};