'use strict';

var gulp = require('gulp');

// takes in a callback so the engine knows when it'll be done
gulp.task('one', function(cb) {
    // do stuff -- async or otherwise
    cb(err); // if err is not null and not undefined, the run will stop, and note that it failed
});

// identifies a dependent task must be complete before this one begins
gulp.task('two', ['one'], function() {
    // task 'one' is done now
});


// Scripts - concatenates the js together and minifies if in production
gulp.task('phantom', function ()
{
    gulp.src(config.scripts.src)
        .pipe(concat(config.scripts.targetName))
        .pipe(gulpif(config.isProd, uglify()))
        .pipe(gulp.dest(config.scripts.dest))
});

