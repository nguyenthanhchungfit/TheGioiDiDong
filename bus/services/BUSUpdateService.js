const fs = require('fs');
var query = require('querystring');
var app = require('http');
var session_storage_process = require('../server_connection/session_storage_process');


const fieldSessionID = "sessionID";

var post_options = {
    host: 'localhost',
    port: '8003',
    method: 'POST'
}

function update(req, res, responseHeader, session_client_manager){
    var tempdata = '';
    req.on('data', function (chunk) {
        tempdata += chunk;
    });

    req.on('end', function(){
        console.log("data update bus");
        console.log(tempdata);
        var data = query.parse(tempdata);

        // sessionID này dùng để gửi request tới dataServer
        var sessionID = session_storage_process.getField(fieldSessionID);
        var post_data = query.stringify({
            'sessionID' : sessionID,
            'proId': data.proId,
            'gia':data.gia,
            'soluong':data.soluong,
            'duoc_ban':data.duoc_ban
        });

        var headers = {'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(post_data)};

        post_options["path"] = "/update";
        post_options["headers"] = headers;
        
        console.log("post_option", post_options);

        var post_req = app.request(post_options);

        post_req.write(post_data);
        post_req.end();

        post_req.on('error', function(err){
            console.log(err);
        });
    });
}
module.exports = {
    update : update
}
