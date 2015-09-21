'use strict';

var gulp = require('gulp'),
    config = require('../config.js'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint');

var phantom = config.phantom;

gulp.task('phantom-concat', function ()
{
    gulp.src(phantom.src)
        .pipe(concat(phantom.targetName))
        .pipe(gulpif(config.isProd, uglify()))
        .pipe(gulp.dest(phantom.dest));
});

gulp.task('phantom', ['lint', 'phantom-concat']);
