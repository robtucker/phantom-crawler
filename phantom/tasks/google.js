var google = new Task(args);

google.execute = function() {
    console.log('testing 1234');
    phantom.exit();
};
