var getPage = function() {
    var page = require('webpage').create();
    var customUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36';

    page.settings.userAgent = customUserAgent;

    // infoLog, errorLog and returnLog are used instead of console.log() and console.error()
    // on closing these are stringified and returned to node.

    page.onClosing = function(closingPage) {
        console.log('The page is closing! URL: ' + closingPage.url);
    };

    page.onConsoleMessage = function(msg) {
        infoLog(msg);
    };

    page.onLoadStarted = function() {
        loadInProgress = true;
        infoLog(' >> Loading page...'.cyan);
    };

    page.onLoadFinished = function(status) {
        loadInProgress = false;
        if (status === 'success') {
            infoLog('<< successfully loaded'.green);
        } else {
            errorLog('Page not loaded: ' + status);
            urlNotFoundException(page.url);
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
        pageErrorException(msgStack.join('\n'));
    };

    if (config.debug) {
        page.onResourceError = function(resourceError) {
            errorLog('unable to load url: "' + resourceError.url + '"');
            errorLog('error code: ' + resourceError.errorCode + ', description: ' + resourceError.errorString );
        };

        page.onResourceRequested = function (request) {
            infoLog('= onResourceRequested()');
            infoLog('  request: ' + JSON.stringify(request, undefined, 4));
        };

        page.onResourceReceived = function(response) {
            infoLog('= onResourceReceived()' );
            infoLog('  id: ' + response.id + ', stage: "' + response.stage + '", response: ' + JSON.stringify(response));
        };

        page.onNavigationRequested = function(url, type, willNavigate, main) {
            infoLog('= onNavigationRequested');
            infoLog('  destination_url: ' + url);
            infoLog('  type (cause): ' + type);
            infoLog('  will navigate: ' + willNavigate);
            infoLog('  from page\'s main frame: ' + main);
        };
    }
    return page;
};

var page = getPage();
