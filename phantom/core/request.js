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

