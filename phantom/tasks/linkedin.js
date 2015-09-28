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


