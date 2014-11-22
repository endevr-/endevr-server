var should  = require('should');
var request = require('supertest');

var endevrServer = require('./../testServer');
var input = require('./../testConfig');

describe('LinkedIn oAuth', function() {
  describe('GET /auth/linkedin', function() {

  var statusCode;

    it('should redirect to LinkedIn for authentication', function(done) {
    	request(endevrServer)
						.get('/auth/linkedin')
						.expect(function(res) {
              statusCode = res.statusCode;
						})
						.end(function(err, res) {
              statusCode.should.equal(302);
							done();
						})
    });

  });

  // describe('callback', function() {
  //
  //   // it('should be requested after authentication', function(done) {
  //   //
  //   // });
  //
  // });
});

describe('GitHub oAuth', function() {
  describe('GET /auth/github', function() {

    var statusCode;

    it('should redirect to GitHub for authentication', function(done) {
      request(endevrServer)
            .get('/auth/linkedin')
            .expect(function(res) {
              statusCode = res.statusCode;
            })
            .end(function(err, res) {
              statusCode.should.equal(302);
              done();
            })
    });

  });

  // describe('callback', function() {
  //
  //   // it('should be requested after authentication', function(done) {
  //   //
  //   // });
  //
  // });

});
