var should       = require('should');
var request      = require('supertest');
var jwt          = require('jsonwebtoken');
var endevrServer = require('./../testServer');
var input        = require('./../testConfig');


describe('GET Requests', function() {

  //
  //  Normal Endpoints
  //

  // describe('/', function() {
  //
  //   it('should exist', function(done) {
  //     request(endevrServer)
  //       .get('/')
  //       .expect(function(res) {
  //         // console.log(res);
  //       })
  //       .end(function(err, res) {
  //         done();
  //       });
  //   });
  //
  // });

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

    describe('/cards', function() {

      it('should return list of employers for a developer', function(done) {
        request(endevrServer)
          .get('/api/developers/cards'+input.devqueryParams)
          .set('Accept', 'application/json')
          .expect(200)
          .expect(function(res) {
            body = res.body;
          })
          .end(function(err, res) {
            body.should.have.lengthOf(3);
            done();
          });
      });

    });

    describe('/profile', function() {

      it("should return a developer's profile", function(done) {
        request(endevrServer)
          .get('/api/developers/profile'+input.devqueryParams)
          .set('Accept', 'application/json')
          .expect(200)
          .expect(function(res) {
            bodyId = res.body.id;
          })
          .end(function(err, res) {
            bodyId.should.equal(input.devid);
            done();
          });
      });

    });

    describe('/matches', function() {

      it("should return a developer's matches", function(done) {
        request(endevrServer)
          .get('/api/developers/matches'+input.devqueryParams)
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

    })

    describe('JWT Verification', function() {

      it('/cards should not provide info when no JWT is present', function(done) {
        request(endevrServer)
          .get('/api/developers/cards')
          .set('Accept', 'text/html: charset=utf-8')
          .end(function(err, res) {
            res.headers.location.should.equal('/unauthorized');
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

  });

  //
  //  API Endpoint for Employers
  //

  describe('/api/employers', function() {

    var body;
    var bodyId;

    describe('/cards', function() {

      it('should return list of developers for an employer', function(done) {
        request(endevrServer)
          .get('/api/employers/cards'+input.empqueryParams+input.empqueryPos)
          .set('Accept', 'application/json')
          .expect(200)
          .expect(function(res) {
            body = res.body;
          })
          .end(function(err, res) {
            body.should.have.lengthOf(0);
            done();
          });
      });

    });

    describe('/profile', function() {

      it("should return a developer's profile", function(done) {
        request(endevrServer)
          .get('/api/employers/profile'+input.empqueryParams)
          .set('Accept', 'application/json')
          .expect(200)
          .expect(function(res) {
            bodyId = res.body.id;
          })
          .end(function(err, res) {
            bodyId.should.equal(input.empid);
            done();
          });
      });

    });

    describe('/matches', function() {

      it("should return a employer's matches", function(done) {
        request(endevrServer)
          .get('/api/employers/matches'+input.empqueryParams+input.empqueryPos)
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

    });

    describe('/positions', function() {

      it('should provide list of jobs belonging to an employer', function(done) {
        request(endevrServer)
          .get('/api/employers/positions'+input.empqueryParams)
          .set('Accept', 'application/json')
          .expect(200)
          .expect(function(res) {
            body = res.body;
          })
          .end(function(err, res) {
            body.length.should.equal(2);
            done();
          });
      });

    });

    describe('JWT Verification', function() {

      it('/cards should not provide info when no JWT is present', function(done) {
        request(endevrServer)
          .get('/api/employers/cards')
          .set('Accept', 'text/html: charset=utf-8')
          .end(function(err, res) {
            res.headers.location.should.equal('/unauthorized');
            done();
          });
      });

      it('/profile should not provide info when no JWT is present', function(done) {
        request(endevrServer)
          .get('/api/employers/profile')
          .set('Accept', 'text/html: charset=utf-8')
          .end(function(err, res) {
            res.headers.location.should.equal('/unauthorized');
            done();
          });
      });

      it('/matches should not provide info when no JWT is present', function(done) {
        request(endevrServer)
          .get('/api/employers/matches')
          .set('Accept', 'text/html: charset=utf-8')
          .end(function(err, res) {
            res.headers.location.should.equal('/unauthorized');
            done();
          });
      });

      it('/positions should not provide info when no JWT is present', function(done) {
        request(endevrServer)
          .get('/api/employers/positions')
          .set('Accept', 'text/html: charset=utf-8')
          .end(function(err, res) {
            res.headers.location.should.equal('/unauthorized');
            done();
          });
      });

    });

  });

});
