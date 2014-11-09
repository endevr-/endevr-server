var should = require('should');
var request = require('supertest');
var bodyParser = require('body-parser');
var express = require('express');
var endevrServer = express();

endevrServer.use(bodyParser.json());
require('./../../routes/index')(endevrServer);

describe('POST', function() {
  describe('/api/developers', function() {

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
});
