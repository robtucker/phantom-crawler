var system = require('system');
var colors = require('colors');
var args = system.args;

//CONFIG
var verbose = true;

var currentStep = 0, loadInProgress = false;

var fs = require('fs');
var path = 'storage/phantom//hired/companies_' + '_' + Date.now() + '.html';
strictLog(' - Writing stuff to: '.grey + path.grey);
//fs.write(path, fileContent, 'w');


//EXECUTE

var url = getSearchUrl(currentStep);
console.log(url);

page.open(url, function() {
    var result = page.evaluate(function() {
        return document.getElementsByClassName(hd)[0].innerHTML;
        //return page.content;

    });
    if (result) {
        console.log(JSON.stringify(result));
        //strictLog(' [✓] Beginning search results for url: '.cyan);
    } else {
        strictLog('Couldn\'t get search results for url: '.red);
    }
});

var resultsCount = 418;
/*
 while (currentStep < resultsCount) {

 }
*/




