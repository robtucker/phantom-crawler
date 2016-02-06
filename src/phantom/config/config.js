var startTime = +new Date();
var system = require('system');
var colors = require('colors');
var fs = require('fs');

var config = require('../../config');

config.args = system.args;

if (config.args.length === 1) {
    errorLog('Specify a task when invoking this script!');
    phantom.exit();
}

config.task = args.splice(1, 1);
config.renderPath = 'storage/phantom/current_image';
config.includes = {
    jquery: "https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"
};

config.returnValues = {
    info: [],
    errors: [],
    results: []
};

var loadInProgress = false;
