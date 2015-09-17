function buildUrl (params) {
    for (var i in params) {
        if (params.hasOwnProperty(i)) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(params[i]));
        }
    }
    return parts.join("&");
}

function getSearchUrl (start) {
    var parts = ['https://www.google.com/search?'];
    var params = {
        as_sitesearch: 'https://hired.com/companies/',
        start: start
    };
    return buildUrl(params);
}

function getSearchResults (url) {

}