function Exception (type, msg, url) {
    errorLog(msg);
    if (type) {
        var path = 'storage/logs/phantom/' + new Date().toISOString().slice(0, 10);
        //TODO - exceptions should be written to a log file
    }
    die('Exiting unsuccessfully with exception: ' + type);
}

var urlNotFoundException = function(url) {
    var msg = 'Could not open the following url: ' + url;
    return new Exception('urlNotFound', msg, url);
};

var pageErrorException = function(msgStack) {
    errorLog(msgStack.join('\n'));
    return new Exception('pageErrorException', msgStack, page.url);
};

