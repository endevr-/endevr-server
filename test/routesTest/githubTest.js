var should = require('should');
var request = require('supertest');
var bodyParser = require('body-parser');
var express = require('express');
var endevrServer = express();

endevrServer.use(bodyParser.json());
require('./../../routes/index')(endevrServer);


describe('GET /auth/github', function() {

  // it('should redirect to GitHub for authentication', function(done) {
  //
  // });

});

describe('GET /auth/github/callback', function() {

  // it('should be requested after authentication', function(done) {
  //
  // });

});
