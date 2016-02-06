var express = require('express');
var app = express();
var utils = require('./src/shared/utils.js');
var _ = require('lodash');

// env
var appGlobals = require('./src/config');
console.log(appGlobals);
Object.keys(appGlobals).forEach(function(val) {
    app.locals[val] = appGlobals[val];
});

// set absolute path
app.locals.path = _.clone(process.cwd(), true);

// args
app.locals.args = {};
process.argv.forEach(function (val, index, array) {
    app.locals.args[index] = val;
});

// BOOTSTRAP
if (app.locals.args.indexOf('phantom')) {
    console.log('this is a phantom task');
} else {
    if (Object.keys(app.locals.args).length > 2) {
        utils.strictLog('Found arguments');
        utils.strictLog(app.locals.args);
    } else {
        require('./src/server');
    }
}
/*
app.listen(config.port, function(){
    utils.strictLog('Listening on port 3000'.green);
});
*/
var server = app.listen(8080, function() {
    console.log('Ready on port %d', server.address().port);
});