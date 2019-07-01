var express = require('express');
var path = require('path');
var fs = require("fs");
var https = require('https');
var http = require('http');
var bodyParser = require('body-parser');
var port = process.env.PORT || process.env.VCAP_APP_PORT || '8000';
var nano = require('nano')('http://localhost:'+port);

var privateKey  = fs.readFileSync('privatekey.pem', 'utf8');
var certificate = fs.readFileSync('certificate.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};



var app = express();
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', express.static(__dirname + '/angular-qr-scanner'));

app.get('/', function(req, res) {
    console.log("Open index page");
    res.sendFile(path.join(__dirname + '/index.html'));
});

httpServer.listen(3000);
httpsServer.listen(8000);
console.log("server is up on port : "+port);
