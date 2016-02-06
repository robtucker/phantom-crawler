var linkedin = new Task();

linkedin.login = function () {
    var loginUrl = 'https://www.linkedin.com/uas/login';
    request.get(loginUrl, function() {
        var ev = page.evaluate(function() {
            $('#login-email').value = config.logins.linkedin.username;
            $('#login-password').value = config.logins.linkedin.password;
            $('.login-form').click();
        });
        infoLog('login status: ');
        infoLog(ev);

        return ev;
    });
};

linkedin.search = function (params, callback) {
    var url = buildUrl('https://linkedin.com', params);
    request(url, callback);
    infoLog(' [✓] Getting search results'.green);
};

linkedin.scrapeProfile = function(url) {
    var result = request.get(url, function(){
        infoLog(' [✓] Entering profile page'.green);
        var profile = page.evaluate(function() {

            var name = $('.full-name').text();
            var title = $('.title').text();
            var location = $('.locality').first().text();
            var summary = $('.summary').text();

            var websites = [];
            $('#overview-summary-websites').find('li').each(function(index, element) {
                var websiteName = $(element).find('a').text();
                var websiteUrl = $(element).find('a').attr('href');
                websites.push({
                    name: websiteName,
                    url: websiteUrl
                });
            });

            var skills = [];
            var skillElements = $('.endorse-item-name-text').each(function(index, element){
                skills.push($(element).text());
            });

            var edu = [];
            $('[id^=education-][id $=-view]').each(function(index, element){
                var eduSchool = $(element).find('.summary').text();
                var eduDegree = $(element).find('.degree').text();
                var eduMajor = $(element).find('.major').text();
                var eduStartDate = $(element).find('.education-date').find('time').first().text();
                var eduEndDate = $(element).find('.education-date').find('time').last().text();
                edu.push({
                    school: eduSchool,
                    degree: eduDegree,
                    major: eduMajor,
                    start: eduStartDate,
                    end: eduEndDate
                });
            });

            var exp = [];
            $('[id^=experience-][id $=-view]').each(function(index, element){
                var expTitle = $(element).find('header').find('h4').text();
                var expCompany = $(element).find('header').find('h5').text();
                var expStartDate = $(element).find('time').first().text();
                var expEndtDate = $(element).find('time').last().text();
                var expLocation = $(element).find('.locality').text();
                var expSummary = $(element).find('.description').text();
                exp.push({
                    title: expTitle,
                    company: expCompany,
                    summary: expSummary,
                    start: expStartDate,
                    end: expEndtDate,
                    location: expLocation
                });
            });
            return {
                url: url,
                name: name,
                title: title,
                location: location,
                summary: summary,
                skills: skills,
                education: edu,
                experience: exp,
                websites: websites
            };
        });

        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send();
        console.log(request.status);

        if (profile) {
            profile = JSON.stringify(profile);
        } else {
            //$.post('errors/linkedin/');
        }

        returnLog(JSON.stringify(profile));
        infoLog(' [✓] Successfully scraped page'.green);
        die('Exiting successfully. Task complete.');
    });
    return result;
};

linkedin.scrapeProfiles = function(args) {
    var urls = [];
    for (var i = 0; i < args.length; i++) {
        if (validateUrl(args[i])) {
            urls.push(args[i]);
        }
    }
    if (urls.length < 1) {
        errorLog('Pass in at least one valid LinkedIn profile when invoking this task');
        phantom.exit();
    }
    for (var j=0; j < urls.length; j++) {
        this.scrapeProfile(urls[j]);
    }
    die('Exiting successfully. Task complete.'.green);
};

linkedin.execute = function (args) {
/*
    for (var i = 0; i < args.length; i++) {
        if (validateUrl(args[i])) {
            var data = this.scrapeProfile(args[i]);
        }
    }
*/
    var profileUrl = 'https://uk.linkedin.com/in/salaboy';
    this.scrapeProfile(profileUrl);


};
