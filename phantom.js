var system = require('system');
var page = require('webpage').create();

page.open('https://www.linkedin.com/in/ciaranr', function(status) {
    console.log("Status: " + status);
    if(status === "success") {
        var res = page.evaluate(function(){
            return document.getElementById("full-name").textContent;
        });
        console.log('test');
        console.log(typeof(res));
        console.log(res);
    }
    phantom.exit();
});