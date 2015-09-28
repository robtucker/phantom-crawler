if (typeof window[task] !== 'object') {
    errorLog('The task you specified does not exist');
    phantom.exit();
}

window[task].execute(args);