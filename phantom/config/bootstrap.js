var system = require('system');
var colors = require('colors');
var args = system.args;
var fs = require('fs');

var verbose = true,
    currentStep = 0,
    loadInProgress = false;
