var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    wait = require('gulp-wait');

var config = require('./resources/gulp/config.js');

// Scripts - concatenates the js together and minifies if in production
gulp.task('scripts', function ()
{
    gulp.src(config.scripts.src)
        .pipe(concat(config.scripts.targetName))
        .pipe(gulpif(config.isProd, uglify()))
        .pipe(gulp.dest(config.scripts.dest))
});

// Styles - compile sass
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

// Providers - copy the latest vendor distributions from node_modules to the public dir
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

// JSHint
gulp.task('lint', function()
{
    gulp.src(config.scripts.dest + '*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Watch
gulp.task('watch', function()
{
    /*
     gulp.watch(config.scripts.src,[
     'scripts',
     'lint'
     ]);
     */

    gulp.watch(config.styles.src, [
        'styles'
    ]);
});

// Log (example)
gulp.task('log', function()
{
    gutil.log(config);
});

// init
gulp.task('init', ['scripts', 'styles', 'providers', 'lint']);

// js
gulp.task('js', ['scripts', 'lint'])

// Default Task
gulp.task('default', ['styles', 'watch']);

