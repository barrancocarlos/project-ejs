var express = require('express');
var app = express();
var mongoose = require('mongoose');

// import model
var Project = require('../models/projects');
// mport controller
var controller = require('./controller');

//api function export
module.exports = function(app) {

  //GET ALL Function
  app.get('/', controller.getProjects);

  //add route
  app.get('/add', function(req, res) {
    res.render('pages/add');
  });

  //edit route
  app.get('/edit', function(req, res) {
    res.render('pages/edit');
  });

  //error
  app.get('/error', function(req, res) {
    res.render('pages/error');
  });


};
