'use strict';

var gulp = require('gulp'),
    config = require('../config.js'),
    jshint = require('gulp-jshint');

gulp.task('lint', function()
{
    gulp.src(config.phantom.src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});