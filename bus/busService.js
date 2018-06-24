var app = require('http');
var url = require('url');
var query = require('querystring');

const PhoneService = require('./services/PhoneService');
const LoginService = require('./services/LoginService');

var session_manager_class = require('./server_connection/session_manager');
var server_accounts_manager = require('./server_connection/server_accounts_manager');

var session_manager = new session_manager_class(10);
var session_connect_bus = -1;


const port = 8002;
var responseHeader = {'Content-Type': 'application/json', 
                      'Access-Control-Allow-Origin' : '*', 
                      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'};

app.createServer((req, res) => {
    var methodRequest = req.method;
    var urlRequest = req.url;
    console.log(`${urlRequest} - ${methodRequest}`);

    // GET
    if(methodRequest == "GET"){
        switch(urlRequest){
            case '/getAllMobileForHome':
            {
                PhoneService.getAllMobileForHome(req, res, responseHeader);
            }
            break;
            default:
            {
                res.writeHeader(200, {'Content-Type': 'text/plain'});
                res.end("Service not implement!!");
            }
        }
    // POST    
    }else if(methodRequest == "POST"){
        switch(urlRequest){
            case '/loginUser':
            {
                LoginService.loginUser(req, res, responseHeader);
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
        var account = {username : "thanhchung", password: "NTCntc"};
        LoginService.loginServer(account);
    }
});

// Xử lý command cho server
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
    var cmd = text.trim();
    var arguments = cmd.split(" ");
    switch (arguments[0]){
        case "helloworld":
        {
            console.log("Hello world!");
            break;
        }
        case "login":
        {
            if(arguments.length != 3){
                console.log("Wrong Argument Login: >> login account password");
            }else{
                var account = {username : arguments[1], password : arguments[2]}
                LoginService.loginServer(account);
            }
            break;
        }
        case "quit":
        {
            quitServer();
            break;
        }
        default:
        {
            console.log("Not reconized your command!!");
            break;
        } 
    }
});

function quitServer() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}