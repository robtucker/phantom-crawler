var a = [
    function() {
        page.open('https://linkedin.com');
        strictLog(' [✓] Entering login page'.green);
    },
    function() {
        var ev = page.evaluate(function() {
            document.getElementById('login-email').value = 'rob@snap.hr';
            document.getElementById('login-email').value = 'circalit123';
            document.getElementsByClassName('login-form')[0].click();
        });

        if (ev === 1) {
            strictLog(' [✓] Login triggered as expected'.green)
        } else {
            strictLog(' [X] ERROR: Login did not trigger'.red)
        }
    },
    function() {
        var url = buildUrl('https://linkedin.com', {

        });
        page.open(url);
        strictLog(' [✓] Getting search results'.green)
    }
];

