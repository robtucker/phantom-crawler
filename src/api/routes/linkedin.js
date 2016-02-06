var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({extended: false});

router.route('/')
    .get('/profile', function(req, res){
        res.send('foo bar');
    })
    .post('/profile', function(req, res){
        console.log(req);
    });

module.exports = router;
