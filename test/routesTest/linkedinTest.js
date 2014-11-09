var should = require('should');
var request = require('supertest');
var bodyParser = require('body-parser');
var express = require('express');
var endevrServer = express();

endevrServer.use(bodyParser.json());
require('./../../routes/index')(endevrServer);


describe('GET /auth/linkedin', function() {

  // it('should redirect to LinkedIn for authentication', function(done) {
  //
  // });

});

describe('GET /auth/linkedin/callback', function() {

  // it('should be requested after authentication', function(done) {
  //
  // });

});
