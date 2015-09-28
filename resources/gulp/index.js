var gulp = require('gulp'),
    clean = require('gulp-clean'),
    wait = require('gulp-wait'),
    gutil = require('gulp-util');

var config = require('./config.js');

require('./utils/logger.js');

var fs = require('fs');
var onlyScripts = require('./utils/scriptFilter');
var tasks = fs.readdirSync('./resources/gulp/tasks/').filter(onlyScripts);

tasks.forEach(function(task) {
    require('./tasks/' + task);
});

// init
gulp.task('init', ['init-config', 'phantom', 'lint']);

// Default Task
gulp.task('default', ['phantom', 'watch']);

// Watch
gulp.task('watch', ['phantom-watch']);
