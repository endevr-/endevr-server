var should  = require('should');
var request = require('supertest');

var endevrServer = require('./../testServer');
var input = require('./../testConfig');

describe('POST Requests', function() {
  describe('/api/developers', function() {

    describe('/matches', function() {

      it('should tell you if there is a match', function(done) {
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

    });

    describe('/profile', function() {

      it('/profile should update your profile info', function(done) {
        request(endevrServer)
          .post('/api/developers/profile'+input.devqueryParams)
          .send({ category: 'skills',
                  data: {'0': 'JavaScript'}
                })
          .expect(200, done);
      });

    })

    describe('JWT Verification', function() {

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

  describe('/api/employers', function() {

    var jwt;
    var id;

    describe('/matches', function() {

      it('/matches should tell you if there is a match', function(done) {
        request(endevrServer)
          .post('/api/employers/matches'+input.empqueryParams)
          .send({ devid: input.devid,
                  posid: input.empposid,
                  empint: true
                })
          .expect(function(res) {
            body = res.body;
          })
          .end(function(err, res) {
            body.match.should.equal(true);
            done();
          })
      });

    });

    describe('/profile', function() {

      it('/profile should update your profile info', function(done) {
        request(endevrServer)
          .post('/api/employers/profile'+input.empqueryParams)
          .send({ category: 'name',
                  data: 'The Company, Inc.'
                })
          .expect(200, done);
      });

    });

    describe('/login', function() {

      it('/login should log in an existing employer', function(done) {
        request(endevrServer)
          .post('/api/employers/login')
          .send({
                  email: 'test@test.com',
                  password: 'test'
                })
          .expect(200)
          .expect(function(res) {
            // console.log(res.body);
            jwt = res.body.jwt;
          })
          .end(function(err, res) {
            should.exist(jwt);
            done();
          })
      });

    });

    jwt = undefined;

    describe('/new', function() {

      it('/new should create a new employer', function(done) {
        request(endevrServer)
          .post('/api/employers/new')
          .send({
                  email: 'test3@test.com',
                  password: 'test'
                })
          .expect(200)
          .expect(function(res) {
            jwt = res.body.jwt;
          })
          .end(function(err, res) {
            should.exist(jwt);
            done();
          })
      });

    });

    describe('/positions', function() {

      it('/positions should create a new position', function(done) {
        request(endevrServer)
          .post('/api/employers/positions'+input.empqueryParams)
          .send({
                  employers_id: input.empid,
                  position: 'UI Designer',
                  location: 'Palo Alto, CA',
                  required: 'Photoshop, Sketch',
                  preferred: 'Illustrator',
                  salary: '$80k',
                  description: 'Looking for talented and motivated UI Designer.',
                  time: 'Full-Time',
                  company_size: '30+'
                })
          .expect(200)
          .expect(function(res) {
            id = res.body.id;
          })
          .end(function(err, res) {
            should.exist(id);
            done();
          });
      });

    });

    describe('JWT Validation', function() {

      it('/matches should not update info when no JWT is present', function(done) {
        request(endevrServer)
          .post('/api/employers/matches')
          .send({ devid: input.devid,
                  posid: input.empposid,
                  empint: true
                })
          .end(function(err, res) {
            res.headers.location.should.equal('/unauthorized');
            done();
          });
      });

      it('/profile should not update info when no JWT is present', function(done) {
        request(endevrServer)
          .post('/api/employers/profile')
          .send({ category: 'name',
                  data: 'The Cookie Company'
                })
          .end(function(err, res) {
            res.headers.location.should.equal('/unauthorized');
            done();
          });
      });

      it('/positions should not create info when no JWT is present', function(done) {
        request(endevrServer)
          .post('/api/employers/positions')
          .send({
                  employers_id: input.empid,
                  position: 'UI Designer',
                  location: 'Palo Alto, CA',
                  required: 'Photoshop, Sketch',
                  preferred: 'Illustrator',
                  salary: '$80k',
                  description: 'Looking for talented and motivated UI Designer.',
                  time: 'Full-Time',
                  company_size: '30+'
                })
          .end(function(err, res) {
            res.headers.location.should.equal('/unauthorized');
            done();
          });
      });

    });

  });

});
