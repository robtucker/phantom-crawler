'use strict';

var gulp = require('gulp'),
    config = require('../config.js'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint');


gulp.task('phantom-concat', function (cb)
{
    gulp.src(config.phantom.src)
        .pipe(concat(config.phantom.targetName))
        .pipe(gulpif(config.isProd, uglify()))
        .pipe(gulp.dest(config.phantom.dest));
    cb();
});


gulp.task('phantom-lint', ['phantom-concat'], function()
{
    gulp.src(config.phantom.dest + '*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('phantom', ['phantom-lint']);
