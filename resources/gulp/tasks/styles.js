'use strict';

var gulp = require('gulp'),
    config = require('../config.js'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function ()
{
    var styles = config.styles;

    return gulp.src(styles.src)
        .pipe(sass({
            sourceComments: config.isProd ? 'none' : 'map',
            sourceMap: 'sass',
            outputStyle: config.isProd ? 'compressed' : 'nested'
        }))
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
        .on('error', function(e) { console.log(e); })
        .pipe(gulp.dest(styles.dest));
});