'use strict';

var gulp = require('gulp');

gulp.task('styles', function ()
{
    return gulp.src(config.styles.src)
        .pipe(sass({
            sourceComments: config.isProd ? 'none' : 'map',
            sourceMap: 'sass',
            outputStyle: config.isProd ? 'compressed' : 'nested'
        }))
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
        .on('error', function(e) { console.log(e); })
        .pipe(gulp.dest(config.styles.dest));
});