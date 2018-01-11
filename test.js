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
});//end api endpoits

describe('/Get/:id project', function() {
    it('gets a single project given the id', function(done) {
      var project = new Project ({
              name: "delete",
              activitie: "delete",
          });
      project.save(function(err, data) {
        chai.request(config.host + ':' + config.port)
          .get('/api/:' + data.id)
          .end(function(err, res) {
            expect(res).to.have.status(200);
            done();
          });
      });
    });
});//end get :id
