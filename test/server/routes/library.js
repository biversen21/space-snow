var expect = require('chai').expect;
var request = require('supertest');
var app = require('./../../../app.js');

describe('/library API', function(done){
  describe('GET Requests', function(done){
    it('should respond with JSON', function(done){
      request(app)
        .get('/library')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    });
    it('should return an array', function(done){
      request(app)
        .get('/library')
        .set('Accept', 'application/json')
        .end(function(err, res){
          expect(Array.isArray(res.body)).to.be.true;
          done()
        });
    });
  });
});