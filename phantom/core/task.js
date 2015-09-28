function Task (args) {
    this.args = args;
}

Task.prototype.execute = function(args) {
    errorLog('You must declare an execute function for this task: ' + task);
    phantom.exit();
};

Task.prototype.sequencer = function(steps, intervalCount){
    if (!intervalCount) {
        intervalCount = 50;
    }
    var currentStep = 0;

    setInterval(function() {
        if (!loadInProgress && typeof steps[currentStep] == "function") {
            var stepLabel = ' [Step ' + (currentStep + 1) + '] @ ' + Date.now();
            strictLog(stepLabel.magenta);
            var result  = steps[currentStep]();
            currentStep++;
        }
        if (typeof steps[currentStep] != "function") {
            strictLog('  [✓] DONE'.green);
            phantom.exit();
        }
    }, intervalCount);
};

