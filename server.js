// set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


// Db connect =================
mongoose.connect('mongodb://localhost/project');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
      // we're connected!
});

// define model =================

//new schema
var ProjectSchema = mongoose.Schema({
    name: String,
    activitie: String
});

//new model
var Project = mongoose.model('projects', ProjectSchema);

// configuration =================

    
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride('_method'))               // put and delete
    app.set('view engine', 'ejs');                                  // template engine
    //app.engine('.html', require('ejs').__express);                change views from .ejs to .html
    app.use(express.static(__dirname + '/lib'));                    //static files



// routes ======================================================================

//index page route
        app.get('/', function(req, res, next) {
       var projects = Project.find().exec(function(err, data) {
            if(err) {
                return next(err);
            }
             console.log(data);
             res.render('pages/index', { info: data});

        });
    });

//add route
app.get('/add', function(req, res) {
    res.render('pages/add');
});

//edit route
app.get('/edit', function(req, res) {

    res.render('pages/edit', { info: data});  
    
});





// api ---------------------------------------------------------------------

//get all projects
    app.get('/api', function(req, res, next) {
       var projects = Project.find().exec(function(err, data) {
            if(err) {
                return next(err);
            }
             console.log(data);
             res.json(data);

        });
    });

//get 1 project
    app.get('/api/:id', function(req, res, next) {
       var project = Project.findOne().exec(function(err, data) {
            if(err) {
                return next(err);
            }
             console.log(data);
             res.render('pages/edit', { value: data})
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
            if(err) {
                return next(err);
            }
            res.redirect('/');

         });

    });


//Delete project
    app.delete('/api/:id', function(req, res) {
       Project.findByIdAndRemove(req.params.id, function(err, data) {
            res.json(data);
        });
    });

//Update book
    app.put('/api/:id', function(req, res, next) {
        console.log("a carlos no le gusta fuck");
        Project.findById(req.params.id, function(err, data) {
            data.name = req.body.name;
            data.activitie = req.body.activitie;
            data.save(function(err, data) {
                if(err) {
                    return next(err);
                }
                res.status(201).json(data);
            });
        });
    });



// Port ======================================================================
var port = "3000";
app.listen(port);
console.log("Magic happens at " + port);