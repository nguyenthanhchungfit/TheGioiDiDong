var app = require('http');
var url = require('url');
var query = require('querystring');
var session_manager_class = require('./server_connection/session_manager');
var server_accounts_manager = require('./server_connection/server_accounts_manager');

var session_manager = new session_manager_class(10);
var session_connect_bus = -1;

const port = 8002;

function loginDataServer(res, req){
    var post_data = query.stringify({
        'username' : 'thanhchung',
        'password' : 'NTCntc'
    });

    var post_options = {
        host: 'localhost',
        port: '8003',
        path: '/loginservice',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };
    var post_req = app.request(post_options, function(res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });

        res.on('end', function(){
            session_connect_bus = data;
            console.log(session_connect_bus);
        });
    });

    post_req.write(post_data);
    post_req.end();
}


app.createServer((req, res) => {
    var methodRequest = req.method;
    var urlRequest = req.url;
    console.log(`${urlRequest} - ${methodRequest}`);
    if(methodRequest == "GET"){
        switch(urlRequest){
            case '/test':
            {
                
            }
            break;
            default:
            {
                res.writeHeader(200, {'Content-Type': 'text/plain'});
                res.end("Service not implement!!");
            }
        }
        
    }else if(methodRequest == "POST"){
        switch(urlRequest){
            case '/loginservice':
            {
                var body = '';
                req.on('data', function (data) {
                    body += data;
                });
                req.on('end', function () {
                    var account = query.parse(body);
                    if(server_accounts_manager.isExistedAccount(account.username, account.password)){
                        var session = session_manager.insertNewConnection();
                        console.log(session);
                        res.writeHeader(200, {'Content-Type': 'text/plain'});
                        res.end(session);
                    }else{
                        res.writeHeader(200, {'Content-Type': 'text/plain'});
                        res.end("-1");
                    }
                });
            }
            break;
            default:
            {
                res.writeHeader(200, {'Content-Type': 'text/plain'});
                res.end("Service not implement!!");
            }
        }
        
    }
    
}).listen(port, (err) => {
    if(err != null)
        console.log('==> Error: ' + err);
    else{
        console.log('Server is starting at port ' + port);
        loginDataServer();
    }
        

        
});


function loginDataServer(){
    var post_data = query.stringify({
        'username' : 'thanhchung',
        'password' : 'NTCntc'
    });

    var post_options = {
        host: 'localhost',
        port: '8003',
        path: '/loginservice',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };
    var post_req = app.request(post_options, function(res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });

        res.on('end', function(){
            session_connect_bus = data;
            console.log(session_connect_bus);
        });
    });

    post_req.write(post_data);
    post_req.end();
}


