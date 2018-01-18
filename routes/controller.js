var Project = require('../models/projects');

//GET ALL Function
exports.getProjects = function (req, res) {
  var projects = Project.find().exec(function(err, data) {
    if (err) {
      return next(err);
    }
    console.log(data);
    res.render('pages/index', {
      info: data
    });
  });
};
