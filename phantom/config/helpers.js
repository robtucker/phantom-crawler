var strictLog = function(msg) {
    if (verbose) {
        console.log(msg);
    }
};

var die = function(msg){
    console.error(msg);
    phantom.exit();
};
