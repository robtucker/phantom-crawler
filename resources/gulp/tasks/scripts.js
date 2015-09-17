'use strict';

var gulp = require('gulp');

gulp.task('scripts', function ()
{
    gulp.src(config.scripts.src)
        .pipe(concat(config.scripts.targetName))
        .pipe(gulpif(config.isProd, uglify()))
        .pipe(gulp.dest(config.scripts.dest))
});

