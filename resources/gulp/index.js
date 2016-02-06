var gulp = require('gulp'),
    clean = require('gulp-clean'),
    wait = require('gulp-wait'),
    gutil = require('gulp-util');

var fs = require('fs');
var config = require('./config.js');
var filterScripts = require('./utils/scriptFilter');
var log = require('./utils/log.js');


var tasks = fs.readdirSync('./gulp/tasks/').filter(filterScripts);

tasks.forEach(function(task) {
    require('./tasks/' + task);
});

// init
gulp.task('init', ['init-config', 'phantom', 'lint', 'express']);

// Watch
gulp.task('watch', ['phantom-watch']);

// Main
gulp.task('default', ['phantom', 'express', 'watch']);
