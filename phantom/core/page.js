var getPage = function() {
    var page = require('webpage').create();
    var customUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36';

    page.settings.userAgent = customUserAgent;

    page.onConsoleMessage = function(msg) {
        console.log(msg);
    };
    page.onLoadStarted = function() {
        loadInProgress = true;
        console.log(' >> Loading...'.cyan);
    };
    page.onLoadFinished = function() {
        loadInProgress = false;
        console.log(' << Loaded'.green);
    };
    page.onError = function(msg, trace) {
        var msgStack = ['ERROR: ' + msg];

        if (trace && trace.length) {
            msgStack.push('TRACE:');
            trace.forEach(function(t) {
                msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
            });
        }
        console.error(msgStack.join('\n'));
    };
    return page;
};
