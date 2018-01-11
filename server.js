// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var config = require('./config/config');

// Db connect =================
require('./config/database');

// define model =================
require('./models/projects');


// configuration =================
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('_method'));              // put and delete
app.set('view engine', 'ejs');                                  // template engine
//app.engine('.html', require('ejs').__express);                change views from .ejs to .html
app.use(express.static(__dirname + '/public'));                    //static files


// routes ======================================================================
require('./routes/pages')(app);

// api ---------------------------------------------------------------------
require('./routes/api')(app);

// Port ======================================================================

app.listen(config.port);
console.log("Magic happens at " + config.port);
console.log(process.env.NODE_ENV);
