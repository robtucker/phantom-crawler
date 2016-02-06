var infoLog = function(msg) {
    if (args.caller = 'node') {
        results.info.push(msg);
    } else {
        if (config.verbose) {
            console.log(msg);
        }
    }
};

var errorLog = function(msg) {
    if (args.caller = 'node') {
        results.errors.push(msg);
    } else {
        console.error(msg.red);
    }
};

var returnLog = function(msg) {
    if (args.caller = 'node') {
        results.results.push(msg);
    } else {
        console.log(msg);
    }
};