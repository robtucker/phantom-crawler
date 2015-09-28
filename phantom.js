var config = {
    verbose: true,
    debug: false
};

var loadInProgress = false;

YAML = require('yamljs');
ymlConfig = YAML.load('config.yml');
var strictLog = function(msg) {
    if (config.verbose) {
        console.log(msg);
    }
};

var errorLog = function(msg) {
    console.error(msg.red);
};

var die = function(msg){
    console.error(msg);
    phantom.exit();
};

var validateUrl = function (url) {
    var urlregex = new RegExp(
        "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$"
    );
    return urlregex.test(url);
};
var system = require('system');
var colors = require('colors');
var fs = require('fs');

YAML = require('yamljs');
//ARGS = system.args;
//TASK = args.splice(1, 1);


var args = system.args;

if (args.length === 1) {
    errorLog('Specify a task when invoking this script!');
    phantom.exit();
} else {
    strictLog(args);
}

var task = args.splice(1, 1);

var configData = fs.read('config.yml');
var ymlData = YAML.parse(configData);
function Exception (type, msg, task, url) {
    console.log(msg.red);
    if (type) {
        var path = 'storage/logs/phantom/' + new Date().toISOString().slice(0, 10);
        //TODO - exceptions should be written to a log file
    }
}

var selectorNotFoundException = function(selector, url) {
    var msg = 'Selector was not found: ' + selector;
    return new Exception('selectorNotFound', msg, config.task, url);
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
            errorLog('Url failed: ' + url);
        }
        callback();
    });
}


function Task (args) {
    this.args = args;
}

Task.prototype.execute = function(args) {
    errorLog('You must declare an execute function for this task: ' + config.task);
    phantom.exit();
};

Task.prototype.sequencer = function(steps, intervalCount){
    if (!intervalCount) {
        intervalCount = 50;
    }
    var currentStep = 0;

    setInterval(function() {
        if (!loadInProgress && typeof steps[currentStep] == "function") {
            var stepLabel = ' [Step ' + (currentStep + 1) + '] @ ' + Date.now();
            strictLog(stepLabel.magenta);
            var result  = steps[currentStep]();
            currentStep++;
        }
        if (typeof steps[currentStep] != "function") {
            strictLog('  [✓] DONE'.green);
            phantom.exit();
        }
    }, intervalCount);
};


var google = new Task(args);

google.execute = function() {
    console.log('testing 1234');
    phantom.exit();
};

var linkedin = new Task(args);

linkedin.login = function () {
    var ev = page.evaluate(function() {
        document.getElementById('login-email').value = 'rob@snap.hr';
        document.getElementById('login-email').value = 'circalit123';
        document.getElementsByClassName('login-form')[0].click();
    });

    if (ev === 1) {
        strictLog(' [✓] Login triggered as expected'.green);
    } else {
        errorLog(' [X] ERROR: Login did not trigger');
        phantom.exit();
    }
};

linkedin.search = function (params) {
    var url = buildUrl('https://linkedin.com', params);
    request(url, function(){

    });
    strictLog(' [✓] Getting search results'.green);
};

linkedin.scrapeProfile = function(url) {
    return [
        function() {
            page.open(url);
            console.log(page);
            strictLog(' [✓] Entering profile page'.green);
        },
        function() {
            var profile = page.evaluate(function() {
                var title = document.getElementsByClassName('title')[0].innerHTML;
                var location = document.getElementsByClassName('locality')[0].innerHTML;
                var summary = document.getElementsByClassName('summary')[0].innerHTML;
                var skills = [];
                var skillElements = document.getElementsByClassName('endorse-item-name-text');
                for (var i=0; i < skillElements.length; i++) {
                    skills.push(skillElements[i].innerHTML);
                }
                var education = [];
                var eduElements = document.getElementsByClassName('education');
                for (var j=0; j < eduElements.length; j++) {
                    var eduItem = eduElements[j].innerHTML;
                    education.push(eduItem);
                }
                var fields = {
                    name: name,
                    title: title,
                    location: location,
                    bio: summary,
                    skills: skills,
                    education: education
                };
                return fields;

            });

            strictLog(JSON.stringify(profile));
            strictLog(' [✓] Successfully scraped page'.green);
            phantom.exit();
        }
    ];
};

linkedin.execute = function (args) {
    var url = args[1];

    if (!validateUrl(url)) {
        errorLog('Valid url required. Url is currently: '  + url);
        phantom.exit();
    }
    this.sequencer(this.scrapeProfile(url));
};



if (typeof window[task] !== 'object') {
    errorLog('The task you specified does not exist');
    phantom.exit();
}

window[task].execute(args);