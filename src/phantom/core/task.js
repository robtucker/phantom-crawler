function Task () {}

Task.prototype.default = function() {
    errorLog('You must declare an execute function for this task: ' + config.task);
    die('Exiting without executing any task'.red);
};

Task.prototype.sequencer = function(steps, intervalCount){
    if (!intervalCount) {
        intervalCount = 100;
    }
    var currentStep = 0;

    setInterval(function() {
        if (!loadInProgress && typeof steps[currentStep] == "function") {
            var stepLabel = ' [Step ' + (currentStep + 1) + '] @ ' + Date.now();
            infoLog(stepLabel.magenta);
            var result  = steps[currentStep]();
            currentStep++;
        }
        if (typeof steps[currentStep] != "function") {
            infoLog('  [✓] DONE'.green);
            die('Exiting successfully. Script completed.'.green);
        }
    }, intervalCount);
};

