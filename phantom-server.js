var exec = require('child_process').exec;
var args = process.argv;
var config = require('./src/config');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

function PhantomClient(arg1, arg2) {
    EventEmitter.call(this);

    this.loadInProgress = false;
    this.data = {
        startTime: null,
        endTime: null,
        duration: null,
        exitCode: null,
        error: [],
        info: [],
        success: []
    };
    this.on('start', function(){
        this.startTime = +new Date();
    })
    this.on('end', function(){
        this.saveData();
    })
}

PhantomClient.prototype = Object.create(EventEmitter.prototype)

PhantomClient.prototype.handleIncomingData = function (data) {
    var data = JSON.parse(data);

    if(data['success']) {
        this.data.success.push(data['success']);
    }
    if(data['error']) {
        this.data.error.push(data['error']);
    }
    if(data['info']) {
        this.data.info.push(data['info']);
    }
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

PhantomClient.prototype.execute = function () {
    var client = this;

    var phantom = exec('phantomjs ./phantom-test.js',
        function (error, stdout, stderr) {
            if (error) throw error;
            if (stderr) {
                console.log('std error invoked');
            }
            client.handleIncomingData(stdout);
            console.log(client.data);
        });

    phantom.on('exit', function (code) {
        client.data.exitCode = code;
        console.log('Child process exited with exit code ' + code);
        //client.emit('end');
        setTimeout(function() {
            console.log(client.data);

        }, 500);
    });

};

var ph = new PhantomClient();
ph.execute();
