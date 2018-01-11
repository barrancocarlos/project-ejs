var express = require('express');
var app = express();
var config = require('./config/config');

// import model
var Project = require('./models/projects');

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;

chai.use(chaiHttp);

// rest api test
describe('api endpoits', function() {

  it('should list all projects on /api', function(done) {
    chai.request(config.host + ':' + config.port)
      .get('/api')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

});
