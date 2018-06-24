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


function loginServer(){
    console.log("Login");
    var sessionID = session_storage_process.getField(fieldSessionID);
    var post_data = query.stringify({
        'sessionID' : sessionID,
        'username' : 'thanhchung',
        'password' : 'NTCntc'
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

module.exports = {
    loginServer : loginServer
}
