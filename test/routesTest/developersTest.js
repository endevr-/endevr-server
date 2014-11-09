var should = require('should');
var request = require('supertest');
var bodyParser = require('body-parser');
var express = require('express');
var endevrServer = express();

endevrServer.use(bodyParser.json());
require('./../../routes/index')(endevrServer);


describe('GET /api/developers/', function() {

  var responseHARDCODED = { languages: 'JavaScript, HTML, CSS', looking: 'yes' };

  it('response body should exist', function(done) {
    request(endevrServer)
      .get('/api/developers/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(req, res) {
        should.exist(res.body);
        done();
      });
  });

  it('should return list of developers', function(done) {
    request(endevrServer)
      .get('/api/developers/')
      .set('Accept', 'application/json')
      .expect(responseHARDCODED, done);
  });

});

describe('POST /api/developers', function() {

  var developerHARDCODED = {
    service: 'LinkedIn',
    data: {
      firstName: 'Justin',
      lastName: 'Pinili',
      pictureUrl: 'http://www.google.com',
      location: {
        name: 'San Francisco, CA'
      },
      id: 1,
      skills: {
        values: [
          {
            skill: {
              name: 'JavaScript'
            }
          }
        ]
      },
      educations: {
        values: [
          {
            schoolName: 'UC Santa Cruz',
            degree: 'B.S. Computer Science: Video Game Design',
            fieldOfStudy: 'Computer Science'
          }
        ]
      },
      positions: {
        values: [
          {
            company: {
              name: 'CyberSource Corporation',
              title: 'Trainer',
              summary: 'Onboard new hires into the customer support team'
            }
          }
        ]
      }
    }
  };

  it('GITHUB - should return name of the developer', function(done) {
    request(endevrServer)
      .post('/api/developers/')
      .send({ service: 'GitHub'})
      .expect('GitHub', done);
  });

  it('LINKEDIN - should return name of the developer', function(done) {
    request(endevrServer)
      .post('/api/developers/')
      .send(developerHARDCODED)
      .expect('', done);
  });
});

describe('GET /api/developers/:id/cards', function() {

  var responseHARDCODED = [{name: 'hooli', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSk9KBgQU_9o0KbYEVrtPKxzlpMTRuieqR5l8AWXAm5Wr7P00fnyw'},
            {name: 'google', image: 'https://www.google.com/images/srpr/logo11w.png' },
            {name: 'facebook', image: 'https://pbs.twimg.com/profile_images/3513354941/24aaffa670e634a7da9a087bfa83abe6_400x400.png' },
            {name: 'walmart', image: 'https://img.grouponcdn.com/coupons/svWS786jtP7X3Y2JHsBTRQ/walmart_com-500x500' },
            {name: 'hack reactor', image: 'https://jlau-bucket-1.s3.amazonaws.com/uploads/topic/image/14/hack_reactor.png' }];

  it('response body should exist', function(done) {
    request(endevrServer)
      .get('/api/developers/1/cards')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(req, res) {
        should.exist(res.body);
        done();
      });
  });

  it('should return a list of all cards for developers', function(done) {
    request(endevrServer)
      .get('/api/developers/1/cards')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(responseHARDCODED, done);
  });
});
