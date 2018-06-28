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
function loginUser(req, res, responseHeader, session_client_manager){
    var data = '';
    req.on('data', function (chunk) {
        data += chunk;
    });

    req.on('end', function(){
        console.log(data);
        var account = query.parse(data);

        // sessionID này dùng để gửi request tới dataServer
        var sessionID = session_storage_process.getField(fieldSessionID);
        var post_data = query.stringify({
            'sessionID' : sessionID,
            'username' : account.username,
            'password' : account.password
        });

        var headers = {'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(post_data)};

        post_options["path"] = "/loginUser";
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
                res.writeHead(200, responseHeader);
                if(!objDataRequest.error){
                    console.log("Login user success!");

                    var newSessionID = session_client_manager.insertNewConnection(objDataRequest.username, objDataRequest.type);
                    console.log("new session", newSessionID);

                    var objResponse = {sessionID : newSessionID, username : objDataRequest.username, type: objDataRequest.type};
                    res.end(JSON.stringify(objResponse));
                }else{
                    console.log("Login failed");
                    res.end(dataRequest);   
                }
            });
        
        });

        post_req.write(post_data);
        post_req.end();

        post_req.on('error', function(err){
            console.log(err);
        });
    });
}

// Logout 
function logout(req, res, responseHeader, session_client_manager){
    var data = '';
    req.on('data', function (chunk) {
        data += chunk;
    });
    req.on('end', function(){
        var session_client = req.headers.session_user;
        if(session_client == undefined || session_client == -1){
            res.writeHead(200, responseHeader);
            res.end(JSON.stringify({success : "OK"}));
        }else{
            indexSession = session_client_manager.isExistedKey(session_client);
            if(indexSession != -1){
                session_client_manager.removeSession(indexSession);
            }
            res.writeHead(200, responseHeader);
            res.end(JSON.stringify({success : "OK"}));
        }
       
    })
}

// Check conenction
function getConnection(req, res, responseHeader, session_client_manager){
    var data = '';
    req.on('data', function (chunk) {
        data += chunk;
    });
    req.on('end', function(){
        res.writeHead(200, responseHeader);
        var session_client = req.headers.session_user;
        if(session_client == undefined || session_client == -1){   
            res.end(JSON.stringify({error : ""}));
        }else{
            indexSession = session_client_manager.isExistedKey(session_client);
            if(indexSession == -1){   
                res.end(JSON.stringify(session_client_manager.getExpiredError()));
            }else{
                var session = session_client_manager.getSesionAt(indexSession);
                if(!session_client_manager.isExpiredDate(session.last_access, session.timeout)){
                    session_client_manager.updateNewLastAccessAt(indexSession);
                    var objResponse = {sessionID : session.sessionID, username : session.username, type: session.type};
                    res.end(JSON.stringify(objResponse));
                }else{
                    res.end(JSON.stringify(session_client_manager.getExpiredError()));
                }
            }
        }
       
    })
}

module.exports = {
    loginServer : loginServer,
    loginUser : loginUser,
    logout : logout,
    getConnection : getConnection
}
