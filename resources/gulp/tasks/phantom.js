'use strict';

var gulp = require('gulp'),
    config = require('../config.js'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');


var phantom = config.phantom;
var phantomSrc = phantom.src.concat(phantom.includes.src);

gulp.task('phantom-concat', function ()
{
    gulp.src(phantom.src)
        .pipe(concat(phantom.targetName))
        .pipe(gulpif(config.isProd, uglify()))
        .pipe(gulp.dest(phantom.dest));
});

gulp.task('phantom-includes', function(){
    gulp.src(phantom.includes.src)
        .pipe(concat(phantom.includes.targetName))
        .pipe(gulp.dest(phantom.includes.dest));
});

gulp.task('phantom-watch', function() {

    gulp.watch(phantomSrc, [
        'phantom'
    ]);
});

gulp.task('phantom-lint', function()
{
    gulp.src(phantomSrc)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('phantom', ['phantom-lint', 'phantom-concat', 'phantom-includes']);
