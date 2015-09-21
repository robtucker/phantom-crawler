# Phantom Crawler

Crawl the web like a boss

### ## Installation

``` 
npm update
gulp init
```

Whilst working on this repo run the default ```gulp``` task to watch for changes and recompile. The compiled phantom scripts are stored in the phantom.js file in the root directory. 

Run ```phantomjs phantom.js``` to execute.

### Persistence

Since phantom only has a simple filesystem api, the simplest option actually seems to be to send the data somewhere else from within phantom using a regular old xhttprequest. This may be slightly slower, but is nice and easy to implement.
