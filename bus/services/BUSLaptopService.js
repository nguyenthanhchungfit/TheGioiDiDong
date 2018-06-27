const query = require('querystring');
const app = require('http');
const server_storage_process = require('../server_connection/session_storage_process');
const fieldSessionID = "sessionID";


var post_options = {
    host: 'localhost',
    port: '8003',
    method: 'POST'
};

function getAllLaptopForHome(req, res, responseHeader){

    var post_data = query.stringify({
        'sessionID' : server_storage_process.getField(fieldSessionID)
    });

    var headers =  {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(post_data)
    };

    post_options["path"] = '/getAllLaptopForHome';
    post_options["headers"] = headers;

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

    post_req.on('error', function(err){
        console.log(err);
    });
}

function getAllLaptopForAD(req, res, responseHeader){

    var post_data = query.stringify({
        'sessionID' : server_storage_process.getField(fieldSessionID)
    });

    var headers =  {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(post_data)
    };

    post_options["path"] = '/getAllLaptopForAD';
    post_options["headers"] = headers;

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

    post_req.on('error', function(err){
        console.log(err);
    });
}

module.exports = {
    getAllLaptopForHome : getAllLaptopForHome,
    getAllLaptopForAD : getAllLaptopForAD
}