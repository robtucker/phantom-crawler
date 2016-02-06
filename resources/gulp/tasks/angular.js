'use strict';

var gulp = require('gulp'),
    config = require('../config.js'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

var angular = config.angular;

gulp.task('angular-concat', function ()
{
    gulp.src(angular.src)
        .pipe(concat(angular.targetName))
        .pipe(gulpif(config.isProd, uglify()))
        .pipe(gulp.dest(angular.dest));
});

gulp.task('angular-watch', function() {
    gulp.watch(angular.src, [
        'angular'
    ]);
});

gulp.task('angular-lint', function()
{
    gulp.src(config.angular.src)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('angular', ['angular-lint', 'angular-concat']);
