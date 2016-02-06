function Request() {}

Request.prototype.buildQuery  = function(params) {
    var parts = [];
    for (var i in params) {
        if (params.hasOwnProperty(i)) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(params[i]));
        }
    }
    return parts.join("&");
};

Request.prototype.buildUrl = function(base, params) {
    var url = base.trim().replace('?', '');
    if (params) {
        url += '?' + buildQuery(params);
    }
    return url;
};

Request.prototype.validateUrl = function (url) {
    var urlregex = new RegExp(
        "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$"
    );
    return urlregex.test(url);
};

Request.prototype.get = function(url, callback, queryParams) {
    if (queryParams) {
        url = this.buildUrl(url, params);
    }
    if (this.validateUrl(url)) {
        var res = page.open(url, function() {
            if (typeof(jQuery) == 'undefined') {
                infoLog('jQuery is undefined'.red);
                /*
                page.includeJs(config.includes.jquery, function(){
                    infoLog('Loading jQuery'.cyan);
                });
                */
            }
            page.includeJs(config.includes.custom, function(){
                infoLog('Loading custom includes'.cyan);
            });

            if (callback) {
                return callback();
            }
        });
        return res;
    } else {
        errorLog('Invalid url passed to the request function. Aborting script');
        errorLog(url);
        die('Exiting without opening any webpage'.red);
    }
};

Request.prototype.post = function(url, callback)
{
    var req = new XMLHttpRequest();
    req.onreadystatechange = function()
    {
        console.log(req.statusText);
        if (req.readyState == 4 && req.status == 200)
        {
            callback(req);
        }
    };
    req.open('POST', url);
    req.send();
};

var request = new Request();
