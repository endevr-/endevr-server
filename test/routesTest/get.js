var should = require('should');
var request = require('supertest');
var bodyParser = require('body-parser');
var express = require('express');
var jwt = require('jsonwebtoken');
var endevrServer = express();

endevrServer.use(bodyParser.json());
require('./../../routes/index')(endevrServer);

var jwt_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjAsImlhdCI6MTQxNjYwMDI3NH0.4RjXqLmzCADpTA694x-TxFx7B81ZB5lJ7XaPu5jf4yg';

var queryParams = '?jwt_token=' + jwt_token + '&usertype=dev';

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

    it('/cards should return list of developers', function(done) {
      request(endevrServer)
        .get('/api/developers/cards'+queryParams)
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          res.body.should.have.lengthOf(4);
        })
        .end(function(err, res) {
          should.exist(res.body);
          done();
        })
    });

    it('/cards should not provide info when no JWT is present', function(done) {
      request(endevrServer)
        .get('/api/developers/cards')
        .set('Accept', 'application/json')
        .expect(401)
        .expect(function(res) {
          res.body.should.equal('GTFO MANG.');
        })
        .end(function(err, res) {
          should.exist(res.body);
          done();
        });
    });

    it("/profile should return a developer's profile", function(done) {
      request(endevrServer)
        .get('/api/developers/profile'+queryParams)
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          var id;
          jwt.verify(jwt_token, 'lalala', function(err, decoded) {
            if (decoded.id) {
              id = decoded.id;
            }
          });
          res.body.id.should.equal(id);
        })
        .end(function(err, res) {
          done();
        });
    });

    it('/profile should not provide info when no JWT is present', function(done) {
      request(endevrServer)
        .get('/api/developers/profile')
        .set('Accept', 'application/json')
        .expect(401)
        .expect(function(res) {
          res.body.should.equal('GTFO MANG.');
        })
        .end(function(err, res) {
          should.exist(res.body);
          done();
        });
    });

    it("/matches should return a developer's matches", function(done) {
      request(endevrServer)
        .get('/api/developers/matches'+queryParams)
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          res.body.should.have.lengthOf(0);
        })
        .end(function(err, res) {
          done();
        });
    });

    it('/matches should not provide info when no JWT is present', function(done) {
      request(endevrServer)
        .get('/api/developers/matches')
        .set('Accept', 'application/json')
        .expect(401)
        .expect(function(res) {
          res.body.should.equal('GTFO MANG.');
        })
        .end(function(err, res) {
          should.exist(res.body);
          done();
        });
    });

  });

  //
  //  API Endpoint for Employers
  //

  describe('/api/employers', function() {

    // it('/cards should return list of employers', function(done) {
    //   request(endevrServer)
    //     .get('/api/employers/cards'+queryParams)
    //     .set('Accept', 'application/json')
    //     .expect(200)
    //     .expect(function(res) {
    //       res.body.should.have.lengthOf(4);
    //     })
    //     .end(function(err, res) {
    //       should.exist(res.body);
    //       done();
    //     })
    // });
    //
    // it('/cards should not provide info when no JWT is present', function(done) {
    //   request(endevrServer)
    //     .get('/api/employers/cards')
    //     .set('Accept', 'application/json')
    //     .expect(401)
    //     .expect(function(res) {
    //       res.body.should.equal('GTFO MANG.');
    //     })
    //     .end(function(err, res) {
    //       should.exist(res.body);
    //       done();
    //     });
    // });
    //
    // it("/profile should return a developer's profile", function(done) {
    //   request(endevrServer)
    //     .get('/api/employers/profile'+queryParams)
    //     .set('Accept', 'application/json')
    //     .expect(200)
    //     .expect(function(res) {
    //       var id;
    //       jwt.verify(jwt_token, 'lalala', function(err, decoded) {
    //         if (decoded.id) {
    //           id = decoded.id;
    //         }
    //       });
    //       res.body.id.should.equal(id);
    //     })
    //     .end(function(err, res) {
    //       done();
    //     });
    // });
    //
    // it('/profile should not provide info when no JWT is present', function(done) {
    //   request(endevrServer)
    //     .get('/api/employers/profile')
    //     .set('Accept', 'application/json')
    //     .expect(401)
    //     .expect(function(res) {
    //       res.body.should.equal('GTFO MANG.');
    //     })
    //     .end(function(err, res) {
    //       should.exist(res.body);
    //       done();
    //     });
    // });
    //
    // it("/matches should return a developer's matches", function(done) {
    //   request(endevrServer)
    //     .get('/api/employers/matches'+queryParams)
    //     .set('Accept', 'application/json')
    //     .expect(200)
    //     .expect(function(res) {
    //       res.body.should.have.lengthOf(0);
    //     })
    //     .end(function(err, res) {
    //       done();
    //     });
    // });
    //
    // it('/matches should not provide info when no JWT is present', function(done) {
    //   request(endevrServer)
    //     .get('/api/employers/matches')
    //     .set('Accept', 'application/json')
    //     .expect(401)
    //     .expect(function(res) {
    //       res.body.should.equal('GTFO MANG.');
    //     })
    //     .end(function(err, res) {
    //       should.exist(res.body);
    //       done();
    //     });
    // });

  });

});
