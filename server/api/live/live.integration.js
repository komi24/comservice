'use strict';

var app = require('../..');
import request from 'supertest';

var newLive;

describe('Live API:', function() {
  describe('GET /y', function() {
    var lives;

    beforeEach(function(done) {
      request(app)
        .get('/y')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          lives = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(lives).to.be.instanceOf(Array);
    });
  });

  describe('POST /y', function() {
    beforeEach(function(done) {
      request(app)
        .post('/y')
        .send({
          name: 'New Live',
          info: 'This is the brand new live!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newLive = res.body;
          done();
        });
    });

    it('should respond with the newly created live', function() {
      expect(newLive.name).to.equal('New Live');
      expect(newLive.info).to.equal('This is the brand new live!!!');
    });
  });

  describe('GET /y/:id', function() {
    var live;

    beforeEach(function(done) {
      request(app)
        .get(`/y/${newLive._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          live = res.body;
          done();
        });
    });

    afterEach(function() {
      live = {};
    });

    it('should respond with the requested live', function() {
      expect(live.name).to.equal('New Live');
      expect(live.info).to.equal('This is the brand new live!!!');
    });
  });

  describe('PUT /y/:id', function() {
    var updatedLive;

    beforeEach(function(done) {
      request(app)
        .put(`/y/${newLive._id}`)
        .send({
          name: 'Updated Live',
          info: 'This is the updated live!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedLive = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLive = {};
    });

    it('should respond with the original live', function() {
      expect(updatedLive.name).to.equal('New Live');
      expect(updatedLive.info).to.equal('This is the brand new live!!!');
    });

    it('should respond with the updated live on a subsequent GET', function(done) {
      request(app)
        .get(`/y/${newLive._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let live = res.body;

          expect(live.name).to.equal('Updated Live');
          expect(live.info).to.equal('This is the updated live!!!');

          done();
        });
    });
  });

  describe('PATCH /y/:id', function() {
    var patchedLive;

    beforeEach(function(done) {
      request(app)
        .patch(`/y/${newLive._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Live' },
          { op: 'replace', path: '/info', value: 'This is the patched live!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedLive = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedLive = {};
    });

    it('should respond with the patched live', function() {
      expect(patchedLive.name).to.equal('Patched Live');
      expect(patchedLive.info).to.equal('This is the patched live!!!');
    });
  });

  describe('DELETE /y/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/y/${newLive._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when live does not exist', function(done) {
      request(app)
        .delete(`/y/${newLive._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
