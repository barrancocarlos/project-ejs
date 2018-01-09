var mongoose = require('mongoose');

//new schema
var ProjectSchema = mongoose.Schema({
    name: String,
    activitie: String
});

//new model
var Project = mongoose.model('projects', ProjectSchema);

module.exports = Project;
