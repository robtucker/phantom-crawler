'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    wait = require('gulp-wait');

var config = require('./gulp/config.js');

require('./gulp/utils/logger.js');

var fs = require('fs');
var onlyScripts = require('./gulp/utils/scriptFilter');
var tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

tasks.forEach(function(task) {
    require('./tasks/' + task);
});

// init
gulp.task('init', ['scripts', 'styles', 'providers', 'lint']);

// Default Task
gulp.task('default', ['phantom', 'watch']);

// Watch
gulp.task('watch', function()
{
     gulp.watch(config.phantom.src, ['phantom', 'lint']);
});

