# Phantom Crawler

Crawl the web like a boss

### Installation

Requirements:

- NodeJS
- PhantomJS (included in your PATH)
- PM2 receommended for scraping large quantities in production

Initialization:

``` 
npm install
gulp init
```

During development, run the default ```gulp``` task to watch for changes and run various tasks. 

To run in production use PM2 for multi-threading:

```
export NODE_ENV=production
pm2 npm start
```


### Phantom

The compiled phantom scripts are stored in the ./src/phantom/dist/executable.js file in the root directory. e.g.

```
phantomjs ./src/phantom/dist/executable.js <task> <method> <args>
``` 

Phantom tasks are separated in 'tasks'. All tasks should extend the base Task, and they must have a default method. You can also specify a specific method in the second argument. Multiple methods can be called, and these are chainable.

```
phantomjs ./src/phantom/dist/executable.js linkedin login search <someURL>
```

I have provided some example tasks for Google and LinkedIn scraping.



### Persisting data

Since phantom only has a very simple filesystem api, the best option is to send the data back to node and persist it in node. 

However this presents a difficult design decision because Phantom and Node are not particularly compatible. Phantom does not inherit from Node at all.

It seems Sam Gente's [phantomjs-node](https://github.com/sgentle/phantomjs-node) repo is currently the most popular bridge. As he says:

```
How do you communicate with a process that doesn't support shared memory, sockets, FIFOs, or standard input?

Well, there's one thing PhantomJS does support, and that's opening webpages. In fact, it's really good at opening web pages. So we communicate with PhantomJS by spinning up an instance of ExpressJS, opening Phantom in a subprocess, and pointing it at a special webpage that turns socket.io messages into alert() calls. Those alert() calls are picked up by Phantom and there you go!

The communication itself happens via James Halliday's fantastic dnode library, which fortunately works well enough when combined with browserify to run straight out of PhantomJS's pidgin Javascript environment.
```

However we must ask ourselves whether such complexity is actually required or even beneficial? For most web crawlers stdin is not required. Only stdout and stderr are required to pass the output back to Node. Rather than stdin, behaviour can be controlled simply by using command line args.

### Returning values to Node

Since we are using stdout, we must serialize objects before logging them. Values should returned to node through 3 methods:

```
infoLog() //for unimportant verbose details and warnings
errorLog() //for critical errors
returnLog() //for actual results you are trying to save
```

Node then picks up the data, which has been properly marked, and knows how to process it properly. 

Child processes in Node are aysnchronous so any server side processing that is needed must be passed to the client module at ```./src/phantom/client.js``` as a callback.


### Notes

The phantom scripts are concatenated together by Gulp. Gulp compiles them in a particular order as determined in the Gulp config file. If you decide to change the directory structure, remember to update the build order in the Gulp config file.

Some tasks may involve a complex series of steps, such as logging in, visiting a certain page, and then doing somethig. The base Task class includes a sequencer which takes an array of functions to be executed in order.


### Calling phantom from node

Since the persistance is happening in node the phantom task must be called from node. e.g.

```

Phantom scripts are executed from node. New phantom tasks should be added to the config.json file.


### Includes

In Phantom there are two execution contexts - the outer Phantom parent context, which has access to the ```phantom``` object and required modules, and the child process, which runs webkit, and which exists within the window of the headless browser.

Anything inside page.evaluate occurs in the inner webkit context, and it does not have access to functions defined in the phantom context. 

The page.onCallback function is designed to overcome this problem

### Redis
Since we are saving lots of data and we want it to be lightening fast we will use Redis. 
