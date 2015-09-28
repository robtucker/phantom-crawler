var system = require('system');
var colors = require('colors');
var fs = require('fs');

var args = system.args;

if (args.length === 1) {
    errorLog('Specify a task when invoking this script!');
    phantom.exit();
} else {
    strictLog(args);
}

var task = args.splice(1, 1);
