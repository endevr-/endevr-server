var should = require('should');
var request = require('supertest');
var bodyParser = require('body-parser');
var express = require('express');
var endevrServer = express();

endevrServer.use(bodyParser.json());
require('./../../routes/index')(endevrServer);


describe('GET /', function() {

  it('should return "endevr"', function(done) {
    request(endevrServer)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200)
      .expect('endevr', done);
  });

});

describe('GET *', function() {

  it('should return 404 error.', function(done) {
    request(endevrServer)
      .get('/aeofibndfs')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(404)
      .expect('404 - Not Found', done);
  });

});
