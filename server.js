var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var passport       = require('passport');
var port           = process.env.PORT || 9000;

app.use(passport.initialize());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
}

app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use(express.static(__dirname + '/public'));
require('./routes/index')(app);

var bookshelf = require('./config/db');

app.listen(port);
console.log('server running on port: ' + port);
exports = module.exports = app;
