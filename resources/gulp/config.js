'use strict';

function GulpConfig () {

    this.env = function () {
        // Todo: parse yaml config file
        return false;
    };
    this.isProd = this.env();

    this.src = 'phantom/';
    this.dest = 'public/'
    this.vendor = 'node_modules/';

    this.phantom = {
        src: [
            // PHANTOM - build order
            'phantom/config/*.js',
            'phantom/core/*.js',
            'phantom/tasks/*.js',
            'phantom/server.js'
        ],
        dest: '',
        targetName: 'phantom.js',
        prefix: 'last 2 version'
    };

    this.styles = {
        src: [
            this.src + 'sass/**/*.scss'
        ],
        dest: this.dest + 'css',
        targetName: 'app.css',
        prefix: 'last 2 version'
    };

    this.providers = {
        js: {
            src: [
                this.vendor + 'jquery/dist/jquery.min.js'
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