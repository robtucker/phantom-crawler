'use strict';

var gulp = require('gulp');

gulp.task('lint', function()
{
    gulp.src(config.scripts.dest + '*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});