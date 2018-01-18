var express = require('express');
var app = express();
var mongoose = require('mongoose');

// import model
var Project = require('../models/projects');

//GET ALL Function
function getProjects (req, res) {
  var projects = Project.find().exec(function(err, data) {
    if (err) {
      return next(err);
    }
    console.log(data);
    res.render('pages/index', {
      info: data
    });
  });
}

//api function export
module.exports = function(app) {

  //GET ALL Function
  app.get('/', getProjects);

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
