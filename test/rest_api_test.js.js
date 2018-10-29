var app = require('../server/server');
var request = require('supertest');
var assert = require('assert');
var loopback = require('loopback');

function json(verb, url) {
  return request(app)[verb](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
}

describe('REST API request', function () {
  before(function (done) {
    require('./start-server');
    done();
  });

  after(function (done) {
    app.removeAllListeners('started');
    app.removeAllListeners('loaded');
    done();
  });

  it('should not allow access without access token', function (done) {
    json('get', '/api/todos')
      .expect(401, done);
  });

  it('should login and get the token', function (done) {
    json('post', '/api/appusers/login')
      .send({
        email: 'aa2@aa.com',
        password: 'aa'
      })
      .expect(200, function (err, res) {
        assert(typeof res.body === 'object');
        assert(res.body.id, 'must have an access token');
        done();
      });
  });

  var accessToken;
  it('should login and get list of todo', function (done) {
    json('post', '/api/appusers/login')
      .send({
        email: 'aa2@aa.com',
        password: 'aa'
      })
      .expect(200, function (err, res) {
        assert(typeof res.body === 'object');
        assert(res.body.id, 'must have an access token');
        accessToken = res.body.id;
        json('get', '/api/todos')
          .set('x-access-token', accessToken)
          .expect(200, function (err, res) {
            done();

          });

      });
  });

  it('should login and logout', function (done) {
    json('post', '/api/appusers/login')
      .send({
        email: 'aa2@aa.com',
        password: 'aa'
      })
      .expect(200, function (err, res) {
        assert(typeof res.body === 'object');
        assert(res.body.id, 'must have an access token');
        accessToken = res.body.id;
        json('post', '/api/appusers/logout')
          .set('x-access-token', accessToken)
          .expect(204, function (err, res) {
            done();
          });
      });
  });
});
