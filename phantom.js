var system = require('system');
var colors = require('colors');
var args = system.args;
var fs = require('fs');

var verbose = true,
    currentStep = 0,
    loadInProgress = false;

var strictLog = function(msg) {
    if (verbose) {
        console.log(msg);
    }
};

var die = function(msg){
    console.error(msg);
    phantom.exit();
};

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

function buildQuery (params) {
    var parts = [];
    for (var i in params) {
        if (params.hasOwnProperty(i)) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(params[i]));
        }
    }
    return parts.join("&");
}

function buildUrl (base, params) {
    var url = base.trim().replace('?', '');
    if (params) {
        url += '?' + buildQuery(params);
    }
    return url;
}

function request (url, callback) {

    var page = getPage();

    page.open(url, function(status) {
        strictLog("Status: " + status);
        if(status !== "success") {
            console.error('Url failed: ' + url.red);
        }
        callback();
    });
}


var page = getPage();

var steps = [
    function() {
        page.open('https://linkedin.com');
        strictLog(' [✓] Entering login page'.green);
    },
    function() {
        page.evaluate(function() {
            document.getElementById('login-email').value = 'rob@snap.hr';
            document.getElementById('login-email').value = 'circalit123';
            document.getElementsByClassName('login-form')[0].click();
        });
    },
    function() {
        die(page);
    }
];

var execute = function(){
    interval = setInterval(function() {
        if (!loadInProgress && typeof steps[currentStep] == "function") {
            var stepLabel = ' [Step ' + (currentStep + 1) + '] @ ' + Date.now();
            strictLog(stepLabel.magenta);
            steps[currentStep]();
            currentStep++;
        }
        if (typeof steps[currentStep] != "function") {
            strictLog('  [✓] DONE'.green);
            phantom.exit();
        }
    }, 50);
};

execute();