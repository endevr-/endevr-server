var should  = require('should');
var request = require('supertest');

var endevrServer = require('./../testServer');
var input = require('./../testConfig');

describe('POST', function() {
  describe('/api/developers', function() {

    it('/matches should tell you if there is a match', function(done) {
      request(endevrServer)
        .post('/api/developers/matches'+input.devqueryParams)
        .send({ posid: input.empposid,
                devint: true
              })
        .expect(function(res) {
          body = res.body;
        })
        .end(function(err, res) {
          body.match.should.equal(true);
          done();
        })
    });

    it('/matches should not update info when no JWT is present', function(done) {
      request(endevrServer)
        .post('/api/developers/matches')
        .send({ posid: input.empposid,
                devint: true
              })
        .end(function(err, res) {
          res.headers.location.should.equal('/unauthorized');
          done();
        });
    });

    it('/profile should update your profile info', function(done) {
      request(endevrServer)
        .post('/api/developers/profile'+input.devqueryParams)
        .send({ category: 'skills',
                data: {'0': 'JavaScript'}
              })
        .expect(200, done);
    });

    it('/profile should not update info when no JWT is present', function(done) {
      request(endevrServer)
        .post('/api/developers/profile')
        .send({ category: 'skills',
                data: {'0': 'Ruby'}
              })
        .end(function(err, res) {
          res.headers.location.should.equal('/unauthorized');
          done();
        });
    });
  });
});
