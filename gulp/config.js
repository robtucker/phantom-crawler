function GulpConfig () {

    this.checkEnv = function () {
        // Todo: create a js method to check if APP_ENV is production
        return false;
    };
    this.isProd = this.checkEnv();

    this.src = 'app/';
    this.dest = 'dist';
    this.vendor = 'node_modules/';

    this.scripts = {
        src: [
            // PHANTOM - build order
            this.src + 'core/*.js',
        ],
        dest: this.dest + '',
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
                'jquery/dist/jquery.min.js'
            ],
            dest: this.dest + 'js/vendor/'
        },
        css: {
            src: [
                'fontawesome/css/font-awesome.min.css'
            ],
            dest: this.dest + 'css/vendor/'
        }
    };
};

module.exports =  new GulpConfig();