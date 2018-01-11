var express = require('express');
var app = express();

// import model
var Project = require('./models/projects');

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

// Test the /GET route

describe('project-api', function() {

  it('should list ALL projects on /api GET', function(done) {
  chai.request(app)
    .get('/api')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});

});
