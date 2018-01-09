var express = require('express');
var app = express();
var mongoose = require('mongoose');

// import model
var Project = require('../models/projects');

//api function export
module.exports = function(app) {

  //index page route
  app.get('/', function(req, res, next) {
    var projects = Project.find().exec(function(err, data) {
      if (err) {
        return next(err);
      }
      console.log(data);
      res.render('pages/index', {
        info: data
      });

    });
  });

  //add route
  app.get('/add', function(req, res) {
    res.render('pages/add');
  });

  //edit route
  app.get('/edit', function(req, res) {

    res.render('pages/edit');

  });


};
