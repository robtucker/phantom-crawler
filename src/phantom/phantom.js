if (typeof window[config.task] !== 'object') {
    errorLog('The task you specified does not exist');
    die('Exiting without executing script'.red);
}

window[config.task].execute(args);
