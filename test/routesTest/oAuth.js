var should = require('should');
var request = require('supertest');
var bodyParser = require('body-parser');
var express = require('express');
var endevrServer = express();

endevrServer.use(bodyParser.json());
require('./../../routes/index')(endevrServer);

describe('LinkedIn oAuth', function() {
  describe('GET /auth/linkedin', function() {

    // it('should redirect to LinkedIn for authentication', function(done) {
    //
    // });

  });

  describe('callback', function() {

    // it('should be requested after authentication', function(done) {
    //
    // });

  });
});

describe('GitHub oAuth', function() {
  describe('GET /auth/github', function() {

    // it('should redirect to GitHub for authentication', function(done) {
    //
    // });

  });

  describe('callback', function() {

    // it('should be requested after authentication', function(done) {
    //
    // });

  });

});
