'use strict';

var gulp = require('gulp'),
    config = require('../config.js'),
    jshint = require('gulp-jshint');

gulp.task('lint', function()
{
    gulp.src(config.scripts.dest + '*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});