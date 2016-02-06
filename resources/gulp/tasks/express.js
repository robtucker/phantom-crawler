var gulp   = require( 'gulp' ),
    nodemon = require('gulp-nodemon'),
    config = require('../config.js'),
    gulpif = require('gulp-if'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

gulp.task('express-lint', function()
{
    gulp.src(config.express.src)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});;

gulp.task('express', function () {
    nodemon({ script: 'server.js',
        ext: 'html js',
        tasks: ['express-lint'] })
        .on('restart', function () {
            console.log('restarted server!')
        })
});

//gulp.task('express', ['express-watch']);



