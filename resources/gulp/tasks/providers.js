'use strict';

var gulp = require('gulp'),
    config = require('../config.js'),
    gutil = require('gulp-util');

gulp.task('providers', function ()
{
    var js = config.providers.js;
    var css = config.providers.css;

    for (var i = 0; i < js.src.length; i++) {
        gulp.src(js.src[i])
            .pipe(gulp.dest(js.dest));

    }

    for (var i = 0; i < css.src.length; i++) {
        gulp.src(css.src[i])
            .pipe(gulp.dest(css.dest));
    }
});
