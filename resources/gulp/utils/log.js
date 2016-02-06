'use strict';

var config = require('../config.js'),
    fs = require('fs');

module.exports = function(data) {
    var path = config.logPath;
    fs.write(path, data);
}