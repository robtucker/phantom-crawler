var interval = function(){
    interval = setInterval(function() {
        if (!loadInProgress && typeof steps[currentStep] == "function") {
            var stepLabel = ' [Step ' + (currentStep + 1) + '] @ ' + Date.now();
            strictLog(stepLabel.magenta);
            steps[currentStep]();
            currentStep++;
        }
        if (typeof steps[currentStep] != "function") {
            strictLog('  [✓] DONE'.green);
            phantom.exit();
        }
    }, 50);
};

var exectute = function(){
    interval();
};