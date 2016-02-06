'use strict';

var gulp = require('gulp'),
    rename = require("gulp-rename"),
    fs = require('fs');

gulp.task('init-config', function ()
{
    fs.stat('config.yml', function(err, stat) {
        var congYmlExists = (err == null) ? true : false;
        console.log('yml exists: ' + congYmlExists);
        if (!congYmlExists) {
            console.log('No config.yml detected. Initializing config')
            gulp.src('./config.yml.example')
                .pipe(rename('config.yml'))
                .pipe(gulp.dest('./'));
        }
    });
});

