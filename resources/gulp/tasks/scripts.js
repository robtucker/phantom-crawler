'use strict';

var gulp = require('gulp'),
    config = require('../config.js'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('scripts', function ()
{
    gulp.src(config.scripts.src)
        .pipe(concat(config.scripts.targetName))
        .pipe(gulpif(config.isProd, uglify()))
        .pipe(gulp.dest(config.scripts.dest))
});

