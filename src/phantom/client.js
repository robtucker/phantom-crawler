var exec = require('child_process').exec;
var fs = require('fs');

function PhantomClient() {
    this.data = {
        error: [],
        info: [],
        success: []
    };
}

PhantomClient.prototype.handleIncomingData = function (data) {
    var data = JSON.parse(data);

    Object.keys(data).forEach(function(key){
        if(key = 'info') {
            this.data.info.push(data[key]);
        } else if(key = 'success') {
            this.data.success.push(data[key]);
        } else if(key = 'error') {
            this.data.error.push(data[key]);
        } else {
            console.log("Data could not be identified: " + data)
        }
    });
};

PhantomClient.prototype.saveData = function(){
    var data = JSON.stringify(this.data);

    fs.writeFile('./storage/logs/test.json', data, function (err) {
        if (err) {
            throw err;
        } else {
            console.log('Data saved!');
        }
    });
};

PhantomClient.prototype.crawl = function () {

    var client = this;
    var phantom = exec('phantomjs ./phantom-test.js',
        function (error, stdout, stderr) {
            if (error) throw error;
            if (stderr) {
                console.log('std error invoked');
            }
            client.handleIncomingData(stdout);
        });

    phantom.on('exit', function (code) {
        client.saveData(client.data);
        console.log('Child process exited with exit code ' + code);
    });
};

module.exports = exports = PhantomClient;