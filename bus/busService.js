var app = require('http');
var url = require('url');
var query = require('querystring');

const PhoneService = require('./services/BUSPhoneService');
const LaptopService = require('./services/BUSLaptopService');
const TabletService = require('./services/BUSTabletService');
const LoginService = require('./services/BUSLoginService');
const update = require('./services/BUSUpdateService');


var session_manager_class = require('./server_connection/session_manager');

const session_client_store_path= __dirname + "/server_connection/session_client_storage.json";
const session_client_amount_manager = 100;
var session_client_manager = new session_manager_class(session_client_amount_manager, session_client_store_path);




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
            case '/test':{
                console.log(req.headers);
                console.log(req.headers.session_user); 
                res.writeHead(200, responseHeader);
                res.end(JSON.stringify({'result' : 'OK'}));      
            }
            break;
            case '/getAllMobileForHome':
            {
                PhoneService.getAllMobileForHome(req, res, responseHeader);
            }
            break;
            case '/getAllLaptopForHome':
            {
                LaptopService.getAllLaptopForHome(req, res, responseHeader);
            }
            break;
            case '/getAllTabletForHome':
            {
                TabletService.getAllTabletForHome(req, res, responseHeader);
            }
            break;

            case '/getAllMobileForAD':
            {
                PhoneService.getAllMobileForAD(req, res, responseHeader);
            }
            break;
            case '/getAllLaptopForAD':
            {
                LaptopService.getAllLaptopForAD(req, res, responseHeader);
            }
            break;
            case '/getAllTabletForAD':
            {
                console.log("tablet..............");
                TabletService.getAllTabletForAD(req, res, responseHeader);
            }
            break;
            case '/logout':{
                LoginService.logout(req, res, responseHeader, session_client_manager);
            }
            break;
            case '/getConnection':{
                LoginService.getConnection(req, res, responseHeader, session_client_manager);
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
                LoginService.loginUser(req, res, responseHeader, session_client_manager);
            }
            break;
            case '/update':
            {
                console.log("update long");
                update.update(req, res, responseHeader, session_client_manager);
            }
            break;
            default:
            {
                res.writeHeader(200, {'Content-Type': 'text/plain'});
                res.end("Service not implement!!");
            }
        }
        
    }else if(methodRequest == "OPTIONS"){
        console.log('!OPTIONS');
        var headers = {};
        // IE8 does not allow domains to be specified, just the *
        // headers["Access-Control-Allow-Origin"] = req.headers.origin;
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, session_user";
        res.writeHead(200, headers);
        res.end();
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
        case "printConnections":
        {
            console.log("*** CURRENT CONNECTIONS: ")
            session_client_manager.printConnections();
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
  console.log('Server is stopped!');
  process.exit();
}