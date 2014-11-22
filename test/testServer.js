var bodyParser   = require('body-parser');
var express      = require('express');
var jwt          = require('jsonwebtoken');
var endevrServer = express();

endevrServer.use(bodyParser.json());
require('./../routes/index')(endevrServer);

module.exports = endevrServer;
