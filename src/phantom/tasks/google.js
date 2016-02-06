var google = new Task(args);

google.search = function(q, site) {
    var url = "https://www.google.com/search";

    if (Array.isArray(q)) {
        q = q.join('+');
    }

    var params = {
        as_q: q,
        as_sitesearch: site
    };

    var result = request.get(url, function() {
        infoLog(' [✓] Entering google search page'.green);
        var profile = page.evaluate(function () {


        });
    }, params);
};

google.execute = function() {
    var url = 'https://www.google.co.uk';
    request.get(url, function(){
        var result = page.evaluate(function(){

        });
        console.log(config.renderPath);
        page.render(config.renderPath + 'currentPage');

        //die('exiting google task');

    });
};
