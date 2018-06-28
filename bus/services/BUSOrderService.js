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


function LuuThongTinDonHang(req, res, responseHeader, session_client_manager){
    var data = '';
    req.on('data', function (chunk) {
        data += chunk;
    });

    req.on('end', function(){
        var orders = JSON.parse(data);
        console.log(orders);

        // sessionID này dùng để gửi request tới dataServer
        var sessionID = session_storage_process.getField(fieldSessionID);
        var post_data = JSON.stringify({
            'sessionID' : sessionID,
            'orders' : orders
        });

        console.log('post_data', post_data);

        var headers = {'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(post_data)};

        post_options["path"] = "/luuTruDonHang";
        post_options["timeout"] = timeout;
        post_options["headers"] = headers;
        
        console.log("post_option", post_options);

        var post_req = app.request(post_options, function(responseServer) {

            responseServer.setEncoding('utf8');
            var dataRequest = '';

            responseServer.on('data', function (chunk) {
                dataRequest += chunk;
            });

            responseServer.on('end', function(){

                console.log('data receive', dataRequest);
                var objDataRequest = JSON.parse(dataRequest);
                res.end(JSON.stringify(objDataRequest));
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
    LuuThongTinDonHang : LuuThongTinDonHang
}