var should        = require('should');
var request      = require('supertest');
var bodyParser   = require('body-parser');
var express      = require('express');
var jwt          = require('jsonwebtoken');
var endevrServer = express();
var Developer    = require('../../api/developers/developers.model');

endevrServer.use(bodyParser.json());
require('./../../routes/index')(endevrServer);

// find the id of the developer you want to test.
var devid = 58;
var devjwt_token = jwt.sign({ id: devid}, 'lalala');
var devqueryParams = '?jwt_token=' + devjwt_token + '&usertype=dev';

// find the id of the employer you want to test.
var empid = 127;
var empjwt_token = jwt.sign({ id: empid}, 'lalala');
var empqueryParams = '?jwt_token=' + empjwt_token + '&usertype=emp';

describe('GET', function() {

  //
  //  Normal Endpoints
  //

  describe('/', function() {

    // it('should return "endevr"', function(done) {
    //   request(endevrServer)
    //     .get('/')
    //     .expect(200,done);
    // });

  });

  describe('*', function() {

    it('should return 404 error.', function(done) {
      request(endevrServer)
        .get('/aeofibndfs')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(404)
        .expect('404 - Not Found', done);
    });

  });

  //
  //  API Endpoint for Developers
  //

  describe('/api/developers', function() {

    var body;
    var bodyId;

    it('/cards should return list of employers for a developer', function(done) {
      request(endevrServer)
        .get('/api/developers/cards'+devqueryParams)
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          body = res.body;
        })
        .end(function(err, res) {
          body.should.have.lengthOf(3);
          done();
        })
    });

    it('/cards should not provide info when no JWT is present', function(done) {
      request(endevrServer)
        .get('/api/developers/cards')
        .set('Accept', 'text/html: charset=utf-8')
        .end(function(err, res) {
          res.headers.location.should.equal('/unauthorized');
          done();
        });
    });

    it("/profile should return a developer's profile", function(done) {
      request(endevrServer)
        .get('/api/developers/profile'+devqueryParams)
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          bodyId = res.body.id;
        })
        .end(function(err, res) {
          bodyId.should.equal(devid);
          done();
        });
    });

    it('/profile should not provide info when no JWT is present', function(done) {
      request(endevrServer)
        .get('/api/developers/profile')
        .set('Accept', 'text/html: charset=utf-8')
        .end(function(err, res) {
          res.headers.location.should.equal('/unauthorized');
          done();
        });
    });

    it("/matches should return a developer's matches", function(done) {
      request(endevrServer)
        .get('/api/developers/matches'+devqueryParams)
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          body = res.body;
        })
        .end(function(err, res) {
          body.length.should.equal(1);
          done();
        });
    });

    it('/matches should not provide info when no JWT is present', function(done) {
      request(endevrServer)
        .get('/api/developers/matches')
        .set('Accept', 'text/html: charset=utf-8')
        .end(function(err, res) {
          res.headers.location.should.equal('/unauthorized');
          done();
        });
    });

  });

  //
  //  API Endpoint for Employers
  //

  describe('/api/employers', function() {

    // var body;
    // var bodyId;
    //
    // it('/cards should return list of developers for an employer', function(done) {
    //   request(endevrServer)
    //     .get('/api/employers/cards'+empqueryParams)
    //     .set('Accept', 'application/json')
    //     .expect(200)
    //     .expect(function(res) {
    //       body = res.body;
    //     })
    //     .end(function(err, res) {
    //       body.should.have.lengthOf(1);
    //       done();
    //     })
    // });
    //
    // it('/cards should not provide info when no JWT is present', function(done) {
    //   request(endevrServer)
    //     .get('/api/employers/cards')
    //     .set('Accept', 'text/html: charset=utf-8')
    //     .end(function(err, res) {
    //       res.headers.location.should.equal('/unauthorized');
    //       done();
    //     });
    // });
    //
    // it("/profile should return a developer's profile", function(done) {
    //   request(endevrServer)
    //     .get('/api/employers/profile'+empqueryParams)
    //     .set('Accept', 'application/json')
    //     .expect(200)
    //     .expect(function(res) {
    //       bodyId = res.body.id;
    //     })
    //     .end(function(err, res) {
    //       bodyId.should.equal(empid);
    //       done();
    //     });
    // });
    //
    // it('/profile should not provide info when no JWT is present', function(done) {
    //   request(endevrServer)
    //     .get('/api/employers/profile')
    //     .set('Accept', 'text/html: charset=utf-8')
    //     .end(function(err, res) {
    //       res.headers.location.should.equal('/unauthorized');
    //       done();
    //     });
    // });
    //
    // it("/matches should return a employer's matches", function(done) {
    //   request(endevrServer)
    //     .get('/api/employers/matches'+empqueryParams)
    //     .set('Accept', 'application/json')
    //     .expect(200)
    //     .expect(function(res) {
    //       body = res.body;
    //     })
    //     .end(function(err, res) {
    //       body.length.should.equal(1);
    //       done();
    //     });
    // });
    //
    // it('/matches should not provide info when no JWT is present', function(done) {
    //   request(endevrServer)
    //     .get('/api/employers/matches')
    //     .set('Accept', 'text/html: charset=utf-8')
    //     .end(function(err, res) {
    //       res.headers.location.should.equal('/unauthorized');
    //       done();
    //     });
    // });

  });

});
