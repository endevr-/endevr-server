var should = require('should');
var request = require('supertest');
var express = require('express');
var endevrServer = express();
require('./../routes/index')(endevrServer);

describe('GET /api/developers/', function() {

  it('should return developers in the database', function(done) {
    request(endevrServer)
      .get('/api/developers/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  // endevrServer.close();
});
