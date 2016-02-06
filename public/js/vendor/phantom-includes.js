function Api(){}

Api.prototype.test = function (){
    alert('successful test from inside the includes script');
};

Api.prototype.api.get = function(url, callback)
{
    var req = new XMLHttpRequest();
    req.onreadystatechange = function()
    {
        console.log(req.statusText);
        if (req.readyState == 4 && req.status == 200)
        {
            callback(req.responseText); // Another callback here
        }
    };
    req.open('GET', url);
    req.send();
};

var api = new Api();
//api.get('http://localhost:3000/linkedin/profile');
//api.get('http://localhost:3000/linkedin/profile', strictLog);
