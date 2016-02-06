var system = require('system');
var page = require('webpage').create();
page.open( system.args[1], function (status) {
    if (status !== 'success') {
        var error = {error: 'Unable to access the network!'};
        var error2 = {error: 'Test 2'};
        var error3 = {error: ' the network!'};

        var output = JSON.stringify(error);
        var output2 = JSON.stringify(error2);
        var output3 = JSON.stringify(error3);

        console.log(output);
        console.log(output2);
        console.log(output3);

    } else {
        var result = {result: "This is a string"}
        console.log(JSON.stringify(result));
    }
    phantom.exit();
});


