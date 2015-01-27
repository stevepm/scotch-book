var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config'),
    apiRouter = require('./app/routes/api')(app, express),
    path = require('path');

//app config
//use body parser so we can grab info from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//config our app to handle CORS requests
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'GET, POST');
    res.setHeader('Access-Control-Allow-Origin', 'X-Requested-With,content-type, \Authorization');
    next();
});


//connect to db
mongoose.connect(config.database);

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

//log requests to console
app.use(morgan('dev'));

//all of our routes will be prefixed with /api
app.use('/api', apiRouter);

// catch all route to send to angular
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//start the server
app.listen(config.port);
console.log('http://localhost:' + config.port);