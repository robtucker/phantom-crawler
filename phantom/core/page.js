var getPage = function() {
    var page = require('webpage').create();
    var customUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36';

    page.settings.userAgent = customUserAgent;

    page.onConsoleMessage = function(msg) {
        console.log(msg);
    };
    page.onLoadStarted = function() {
        loadInProgress = true;
        strictLog(' >> Loading page...'.cyan);
    };
    page.onLoadFinished = function(status) {
        loadInProgress = false;
        if (status === 'success') {
            strictLog('<< successfully loaded'.green);
        } else {
            errorLog('Page not loaded: ' + status);
        }
    };
    page.onError = function(msg, trace) {
        var msgStack = ['ERROR: ' + msg];

        if (trace && trace.length) {
            msgStack.push('TRACE:');
            trace.forEach(function(t) {
                msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
            });
        }
        errorLog(msgStack.join('\n'));
    };

    page.onResourceError = function(resourceError) {
        errorLog('unable to load url: "' + resourceError.url + '"');
        errorLog('error code: ' + resourceError.errorCode + ', description: ' + resourceError.errorString );
    };

    if (config.debug) {
        page.onResourceRequested = function (request) {
            console.log('= onResourceRequested()');
            console.log('  request: ' + JSON.stringify(request, undefined, 4));
        };

        page.onResourceReceived = function(response) {
            console.log('= onResourceReceived()' );
            console.log('  id: ' + response.id + ', stage: "' + response.stage + '", response: ' + JSON.stringify(response));
        };

        page.onNavigationRequested = function(url, type, willNavigate, main) {
            console.log('= onNavigationRequested');
            console.log('  destination_url: ' + url);
            console.log('  type (cause): ' + type);
            console.log('  will navigate: ' + willNavigate);
            console.log('  from page\'s main frame: ' + main);
        };
    }
    return page;
};

var page = getPage();
