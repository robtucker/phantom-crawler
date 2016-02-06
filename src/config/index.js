var _ = require('lodash');

// searches for a NODE_ENV environment variable on operating system
// falls back to the config.env param in package.json, and finally local
var env = process.env.NODE_ENV || process.env.npm_package_config_env || 'local';
var args = process.argv;
var globals = require('./environment/globals.json');

function getEnvironmentFile() {
    if (env.indexOf('local') || env.indexOf('dev')) {
        return require('./environment/' + env + '.json');
    } else if (env.indexOf('prod')) {
        return require('./environment/production.json');
    } else {
        console.error('You must provide an environment config file. e.g. production.json or local-rob.json');
        process.exit();
    }
}

// the environment-specific values will overwrite global values
module.exports = _.extend(
    {
        env: env,
        args: args
    },
    globals,
    getEnvironmentFile()
);


