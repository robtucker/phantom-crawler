'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    config = require('../config.js');

gulp.task('log', function()
{
    gutil.log(config.providers.js.dest);
});
