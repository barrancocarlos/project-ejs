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
describe('/api endpoits', function() {
  //get all
  it('should get all projects on /api', function(done) {
    chai.request(config.host + ':' + config.port)
      .get('/api')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).be.a('object');
        done();
      });
  });
  // create new
  it('create new project on /api', function(done) {
    var project = {
      name: "Mocha",
      activitie: "Success",
    };
    chai.request(config.host + ':' + config.port)
      .post('/api')
      .send(project)
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).be.a('object');
        done();
      });
  });
  //get by id
  it('/Get/:id project', function() {
    chai.request(config.host + ':' + config.port)
      .get('/api/591336239372a11b24c1c16e')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).be.a('object');
        done();
      });
  });
  //delete
  it('/Get/:id project', function() {
    chai.request(config.host + ':' + config.port)
      .del('/api/5a5ea6493ca74705488eb796')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

}); //end api endpoits
