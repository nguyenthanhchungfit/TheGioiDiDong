'use strict'

var app = require('http');
var url = require('url');
var query = require('querystring');
//const config = require("config");

var port = 8003;

app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    switch(req.method) {
        case 'GET':
            res.writeHeader(200, {'Content-Type': 'text/plain'});
            res.end("Data GET!!");
            console.log('--> Done');
            break
        case 'POST':
            res.writeHeader(200, {'Content-Type': 'text/plain'});
            res.end("Data POST!!");
            break;
        case 'PUT':
            break;
        case 'DELETE':
            break;
    }
}).listen(port, (err) => {
    if(err != null)
        console.log('==> Error: ' + err);
    else
        console.log('Server is starting at port ' + port);
});
