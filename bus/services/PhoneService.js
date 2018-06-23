var sessionID = "abc";
var query = require('querystring');
var app = require('http');

var post_data = query.stringify({
    'sessionID' : sessionID
});

var post_options = {
    host: 'localhost',
    port: '8003',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(post_data)
    }
};

function getAllMobileForHome(req, res, responseHeader){

    post_options["path"] = '/getAllMobileForHome';

    var post_req = app.request(post_options, function(responseServer) {
        responseServer.setEncoding('utf8');
        var data = '';
        responseServer.on('data', function (chunk) {
            data += chunk;
        });
    
        responseServer.on('end', function(){
            res.writeHead(200, responseHeader);
            res.end(data);
        });
    });

    post_req.write(post_data);
    post_req.end();
}







module.exports = {
    getAllMobileForHome : getAllMobileForHome
}