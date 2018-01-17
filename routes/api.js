var express = require('express');
var app = express();

// import model
var Project = require('../models/projects');

exports.getProjects = function (req, res) {
  var projects = Project.find().exec(function(err, data) {
    if (err) {
      return next(err);
    }
  });
};


//api function export
module.exports = function(app) {

  //get all projects
  app.get('/api', function(req, res, next) {
    var projects = Project.find().exec(function(err, data) {
      if (err) {
        return next(err);
      }
      console.log(data);
      res.json(data);

    });
  });

  //get 1 project
  app.get('/api/:id', function(req, res, next) {
    var project = Project.findById(req.params.id, function(err, data) {
      if (err) {
        return next(err);
      }
      console.log(data);
      res.render('pages/edit', {
        value: data
      });
      // res.json(data);

    });
  });

  //Post new project
  app.post('/api', function(req, res, next) {
    var project = new Project({
      name: req.body.name,
      activitie: req.body.activitie
    });
    project.save(function(err, data) {
      if (err) {
        return next(err);
      }
      res.redirect('/');

    });

  });


  //Delete project
  app.delete('/api/:id', function(req, res) {
    Project.findByIdAndRemove(req.params.id, function(err, data) {
      res.redirect('/');
    });

  });

  //Update book
  app.put('/api/:id', function(req, res, next) {
    console.log("edit id");
    Project.findById(req.params.id, function(err, data) {
      data.name = req.body.name;
      data.activitie = req.body.activitie;
      data.save(function(err, data) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
};
