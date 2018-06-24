const fs = require('fs');
var query = require('querystring');
var app = require('http');
var session_storage_process = require('../server_connection/session_storage_process');


const fieldSessionID = "sessionID";
const timeout = 10000;

var post_options = {
    host: 'localhost',
    port: '8003',
    method: 'POST'
}

// Login to server not response client
function loginServer(account){
    console.log("Login");
    var sessionID = session_storage_process.getField(fieldSessionID);
    var post_data = query.stringify({
        'sessionID' : sessionID,
        'username' : account.username,
        'password' : account.password
    });

    var headers = {'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(post_data)};

    post_options["path"] = "/loginservice";
    post_options["timeout"] = timeout;
    post_options["headers"] = headers;

    var post_req = app.request(post_options, function(responseServer) {
        responseServer.setEncoding('utf8');

        var data = '';
        responseServer.on('data', function (chunk) {
            data += chunk;
        });

        responseServer.on('end', function(){
            console.log('data receive', data);
            var objData = JSON.parse(data);
            session_storage_process.setField(fieldSessionID, objData.sessionID);
        });
    });

    post_req.write(post_data);
    post_req.end();

    post_req.on('error', function(err){
        console.log(err);
    });
}

// Login user and response client
function loginUser(req, res, responseHeader){
    var data = '';
    req.on('data', function (chunk) {
        data += chunk;
    });

    req.on('end', function(){
        var account = JSON.parse(data);
        console.log(account);
        
        var sessionID = session_storage_process.getField(fieldSessionID);
        var post_data = query.stringify({
            'sessionID' : sessionID,
            'username' : account.username,
            'password' : account.password
        });
        
        console.log('post_data', post_data);

        var headers = {'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(post_data)};

        post_options["path"] = "/loginUser";
        post_options["timeout"] = timeout;
        post_options["headers"] = headers;
        
        console.log("post_option", post_options);

        var post_req = app.request(post_options, function(responseServer) {

            console.log("GUI REQUEST");

            responseServer.setEncoding('utf8');
            var dataRequest = '';

            responseServer.on('data', function (chunk) {
                dataRequest += chunk;
            });

            responseServer.on('end', function(){
                console.log('data receive', dataRequest);
                res.writeHead(200, responseHeader);
                res.end(dataRequest);   
            });
        
        });

        post_req.write(post_data);
        post_req.end();

        post_req.on('error', function(err){
            console.log(err);
        });
    });
}


module.exports = {
    loginServer : loginServer,
    loginUser : loginUser
}
