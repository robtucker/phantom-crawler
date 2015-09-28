function Exception (type, msg, task, url) {
    console.log(msg.red);
    if (type) {
        var path = 'storage/logs/phantom/' + new Date().toISOString().slice(0, 10);
        //TODO - exceptions should be written to a log file
    }
}

var selectorNotFoundException = function(selector, url) {
    var msg = 'Selector was not found: ' + selector;
    return new Exception('selectorNotFound', msg, task, url);
};

