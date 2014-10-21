var expect = require('chai').expect;
var request = require('supertest');
var app = require('./../../../app.js');

describe('/game API', function(done){
  describe('GET Requests', function(done){
    it('should respond with JSON', function(done){
      request(app)
        .get('/game')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    });
    it('should return an object', function(done){
      request(app)
        .get('/game')
        .set('Accept', 'application/json')
        .end(function(err, res){
          expect(res.body).to.be.instanceof(Object);
          done()
        });
    });
  });
});