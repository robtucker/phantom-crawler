'use strict';

function GulpConfig () {

    this.env = function () {
        // Todo: parse yaml config file
        return false;
    };
    this.isProd = this.env();
    this.logPath = 'storage/logs/gulp/errors';
    this.vendor = 'node_modules/';

    // EXPRESS
    this.express = {
        src: [
            'app/**/*.js'
        ],
        server: './server.js'
    };

    // PHANTOM
    this.phantom = {
        src: [
            // PHANTOM - build order
            'app/phantom/lib/config/*.js',
            'app/phantom/lib/core/*.js',
            'app/phantom/lib/tasks/*.js',
            'app/phantom/lib/server.js'
        ],
        dest: 'app/phantom/dist',
        targetName: 'executable.js',
        prefix: 'last 2 version'
    };

    // STYLES
    this.styles = {
        src: [
            'sass/**/*.scss'
        ],
        dest: 'public/css',
        targetName: 'app.css',
        prefix: 'last 2 version'
    };

    // PROVIDERS
    this.providers = {
        js: {
            src: [
                this.vendor + 'angular/angular.min.js',
                this.vendor + 'angular-ui-router/build/angular-ui-router.min.js',
                this.vendor + 'angular-ui-router/build/angular-ui-router.min.js'
            ],
            dest: 'public/js/vendor/'
        },
        css: {
            src: [
                this.vendor + 'fontawesome/css/font-awesome.min.css'
            ],
            dest: 'public/css/vendor/'
        }
    };
};

module.exports =  new GulpConfig();