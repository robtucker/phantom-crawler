# Phantom Crawler

Crawl the web like a boss

### ## Installation

``` 
npm update
gulp init
```

Whilst working on this repo run the default ```gulp``` task to watch for changes and recompile. The compiled phantom scripts are stored in the phantom.js file in the root directory. If you want to add new directories remember to add them to the gulp config.

### Phantom


```
phantomjs --ignore-ssl-errors=true phantom.js <task> <args>
``` 

All tasks should extend the base Task and should have an execute function. The global keywords 'task' and 'args' are both reserved.

### Persistence

Since phantom only has a simple filesystem api, the simplest option actually seems to be to send the data somewhere else from within phantom using a regular old xhttprequest. This may be slightly slower, but is nice and easy.
