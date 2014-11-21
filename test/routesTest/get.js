var should = require('should');
var request = require('supertest');
var bodyParser = require('body-parser');
var express = require('express');
var endevrServer = express();

endevrServer.use(bodyParser.json());
require('./../../routes/index')(endevrServer);

var queryParams = '?jwt_token=' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjAsImlhdCI6MTQxNjYwMDI3NH0.4RjXqLmzCADpTA694x-TxFx7B81ZB5lJ7XaPu5jf4yg' + '&usertype=dev';

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

  });

  //
  //  API Endpoint for Employers
  //

  // describe('/api/developers/:id/cards', function() {
  //
  //   var responseHARDCODED = [{name: 'hooli', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSk9KBgQU_9o0KbYEVrtPKxzlpMTRuieqR5l8AWXAm5Wr7P00fnyw'},
  //             {name: 'google', image: 'https://www.google.com/images/srpr/logo11w.png' },
  //             {name: 'facebook', image: 'https://pbs.twimg.com/profile_images/3513354941/24aaffa670e634a7da9a087bfa83abe6_400x400.png' },
  //             {name: 'walmart', image: 'https://img.grouponcdn.com/coupons/svWS786jtP7X3Y2JHsBTRQ/walmart_com-500x500' },
  //             {name: 'hack reactor', image: 'https://jlau-bucket-1.s3.amazonaws.com/uploads/topic/image/14/hack_reactor.png' }];
  //
  //   it('response body should exist', function(done) {
  //     request(endevrServer)
  //       .get('/api/developers/1/cards')
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(200)
  //       .end(function(err, res) {
  //         should.exist(res.body);
  //         done();
  //       });
  //   });
  //
  //   it('should return a list of all cards for developers', function(done) {
  //     request(endevrServer)
  //       .get('/api/developers/1/cards')
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .end(function(err, res) {
  //         res.body.should.have.length(50);
  //         done();
  //       });
  //   });
  // });
  //
  // describe('/api/employers', function() {
  //
  //   var responseHARDCODED = {name: 'hooli', hiring: 'yes' };
  //
  //   it('response body should exist', function(done) {
  //     request(endevrServer)
  //       .get('/api/employers')
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(200)
  //       .end(function(err, res) {
  //         should.exist(res.body);
  //         done();
  //       });
  //   });
  //
  //   it('should return list of employers', function(done) {
  //     request(endevrServer)
  //       .get('/api/employers')
  //       .set('Accept', 'application/json')
  //       .expect(responseHARDCODED, done);
  //   });
  //
  // });
  //
  // describe('/api/employers/:id/cards', function() {
  //
  //   var responseHARDCODED = [{name: 'Jeff', image: 'http://www.clker.com/cliparts/b/8/0/d/11971143901626395792Steren_bike_rider_1.svg.med.png'},
  //             {name: 'Josh', image: 'http://www.clker.com/cliparts/5/D/d/r/S/L/bearded-man-cartoon-hi.png' },
  //             {name: 'Justin', image: 'http://licensedmentalhealthcounselor.files.wordpress.com/2012/03/cute_asian_cartoon_baby_sitting_up_wearing_diaper_with_big_smile_0515-1001-2911-4512_smu1.jpg' },
  //             {name: 'Adam', image: 'http://static8.depositphotos.com/1499637/979/v/950/depositphotos_9794386-Trekking-boy..jpg' },
  //             {name: 'BATMAN!', image: 'http://static.comicvine.com/uploads/original/11113/111136107/4058802-6025115082-31152.jpg' }];
  //
  //   it('response body should exist', function(done) {
  //     request(endevrServer)
  //       .get('/api/employers/1/cards')
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(200)
  //       .end(function(err, res) {
  //         should.exist(res.body);
  //         done();
  //       });
  //   });
  //
  //   it('should return a list of all cards for developers', function(done) {
  //     request(endevrServer)
  //       .get('/api/employers/1/cards')
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(responseHARDCODED, done);
  //   });
  // });

});
