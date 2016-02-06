var bodyParser = require('body-parser');
var _ = require('lodash');

var colors = require('colors');
var fs = require('fs');

// GLOBAL MIDDLEWARE
app.use(express.static('public'));
require('./app/middleware/cors')(app);

// ROUTES
var linkedin = require('./routes/linkedin');
app.use('/linkedin', linkedin);