'use strict';

var gulp = require('gulp'),
    config = require('../config.js');

gulp.task('providers', function ()
{
    //js providers
    for (var i=0; i < config.providers.js.src.length; i++){
        gulp.src(config.vendor + config.providers.js.src[i])
            .pipe(gulp.dest(config.providers.js.dest));
    }
    //css providers
    for (var i=0; i < config.providers.css.src.length; i++){
        gulp.src(config.vendor + config.providers.css.src[i])
            .pipe(gulp.dest(config.providers.css.dest));
    }
});