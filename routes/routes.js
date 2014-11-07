module.exports = function(app) {

// Run on all routes to allow origin
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
 });

// Default route
  app.get('/', function(req, res, next) {
    res.send('endevr');
  });

// Wildcard route
  app.get('*', function(req, res, next) {
    res.send('404 - Not Found')
  })

};
