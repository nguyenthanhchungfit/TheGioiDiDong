var app = require('http');
var url = require('url');
var query = require('querystring');
//const config = require("config");

const port = 8002;

app.createServer((req, res) => {
    res.writeHeader(200, {'Content-Type': 'text/plain'});
    res.end("BUS GET!!");
}).listen(port, (err) => {
    if(err != null)
        console.log('==> Error: ' + err);
    else
        console.log('Server is starting at port ' + port);
});
