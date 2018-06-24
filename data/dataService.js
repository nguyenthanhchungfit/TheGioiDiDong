'use strict'
//Khao Báo Biến
var duong_dan_module_DL_mysql= './data_table_mysql//';

//module về dữ liệu mysql
const config = require("config");

//npm module 
var bodyParser = require('body-parser');
var app = require('http');
var url = require('url');
var query = require('querystring');
var port = config.get("server.port");

// custom module
var session_manager_class = require('./server_connection/session_manager');
const session_server_store_path= __dirname + "/server_connection/session_storage.json";
const session_amout_manager = 10;
var session_manager = new session_manager_class(session_amout_manager, session_server_store_path);
session_manager.loadDataFromFile();
session_manager.printConnections();

// Services
const PhoneService = require("./services/PhoneService");
const LoginService = require("./services/LoginService");

const dataLaptop = require(duong_dan_module_DL_mysql+"dataLaptop");
const dataHinh = require(duong_dan_module_DL_mysql+"dataHinh");
const dataAccount = require(duong_dan_module_DL_mysql+"dataAccount");
const dataKhachHang = require(duong_dan_module_DL_mysql+"dataKhachHang");
const dataMobile = require(duong_dan_module_DL_mysql+"dataMobile");
const dataNhaSX = require(duong_dan_module_DL_mysql+"dataNhaSX");
const dataTablet = require(duong_dan_module_DL_mysql+"dataTablet");
const dataThongSoKyThuat = require(duong_dan_module_DL_mysql+"dataThongSoKyThuat");

var responseHeader = {'Content-Type' : 'application/json','Access-Control-Allow-Origin' : '*', 
'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'};




//Test
//Tạo server lắng nghe kết nối
app.createServer((req, res) => {

    var methodRequest = req.method;
    var urlRequest = req.url;
    console.log(`${urlRequest} - ${methodRequest}`);

   //Tách chuỗi url khi có para
   var Chuoi_url=req.url;
   if(req.url.indexOf('?')>0){
       Chuoi_url=Chuoi_url.slice(0,req.url.indexOf('?'));
   }
    //Tách para từ url thành chuỗi json
   var Chuoi_Tham_so=req.url.slice(req.url.indexOf('?')+1);
   var Tham_so_json = query.parse(Chuoi_Tham_so);
   console.log(req.url);
   var data="";
    switch(req.method) {
        //Lấy dữ liệu
        case 'GET':
        {
            switch(Chuoi_url){
                case '/test':{
                    console.log("TEST - SERVICE");
                    dataAccount.isExistedAccount("a", "1");
                    res.writeHead(200, responseHeader);
                    res.end(JSON.stringify({"data" : "OK"}));
                }
                break;
                case '/getAllLaptop':
                dataLaptop.getAllLaptop().then(function(result){
                    data=JSON.stringify(result);
                    console.log(data);
                })
                break;
                case '/getAllMobile':
                data=dataMobile.getAllMobile().then(function(result){
                    data=JSON.stringify(result);
                    console.log(data);
                });
                break;
                
                case '/getAllMobileForHome' :
                    PhoneService.getAllMobileForHome(req, res, responseHeader);
                break;
                case '/getAllTablet':
                data=dataTablet.getAllTablet().then(function(result){
                    data=JSON.stringify(result);
                    console.log(data);
                });
                break;
                case '/getAllAccount':
                dataAccount.getAllAccount().then(function(result){
                    data=JSON.stringify(result);
                    res.writeHeader(200,responseHeader);
                    res.end(data);
                })
                break;
                case '/getAllHinh':
                dataHinh.getAllHinh().then(function(result){
                    data=JSON.stringify(result);
                    console.log(data);
                })
                break;
                case '/getAllKhachHang':
                dataKhachHang.getAllKhacHang().then(function(result){
                    data=JSON.stringify(result);
                    console.log(data);
                })
                break;
                case '/getAllNhaSanXuat':
                dataNhaSX.getAllNhaSanXuat().then(function(result){
                    data=JSON.stringify(result);
                    console.log(data);
                })
                break;
                case '/getAllThongSoKyThuat':
                dataThongSoKyThuat.getAllThongSoKyThuat().then(function(result){
                    data=JSON.stringify(result);
                    console.log(data);
                })
                break;
            responseHeader['Content-Type'] = 'application/json';
            //res.writeHeader(200, responseHeader);
            //res.end(data);
            //console.log(data);
            console.log('--> Done');
        }
    }
    break;
        //Cập nhập dữ liệu
        case 'POST':
        {
              //Lấy dữ liệu body, method POST
            let body = '';
            var primaryAttribute='',editAttribute='',primaryVal='',editVal='';
            //ví dụ: "UPDATE account SET "+editAttribute+ "='"+editVal+  "' WHERE "+primaryAttribute+" ='"+primaryVal+"'"
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
               var comonData=query.parse(body);
               primaryAttribute=body.primaryAttribute;
               editAttribute=body.editAttribute;
               primaryVal=body.primaryVal;
               editVal=body.editVal;
            });
            switch(req.url){
                case '/loginUser':
                {
                    LoginService.loginUser(req, res, responseHeader, session_manager);
                }
                break;
                case '/loginservice':
                {
                    LoginService.loginFromAnotherServer(req, res, responseHeader, session_manager);
                }
                break;

                case '/getAllMobileForHome' :
                    PhoneService.getAllMobileForHome(req, res, responseHeader);
                break;

                 // Thứ tự truyền para "primaryAttribute,editAttribute,primaryVal,editVal"
                case '/updateLaptop':
                dataLaptop.updateLaptop(primaryAttribute,editAttribute,primaryVal,editVal).then(function(result){
                    data=JSON.stringify(result);
                    console.log(data);
                })
                break;
                case '/updateMobile':
                data=dataMobile.updateMobile(primaryAttribute,editAttribute,primaryVal,editVal).then(function(result){
                    data=JSON.stringify(result);
                    console.log(data);
                });
                break;
                case '/updateTablet':
                data=dataTablet.updateTablet(primaryAttribute,editAttribute,primaryVal,editVal).then(function(result){
                    data=JSON.stringify(result);
                    console.log(data);
                });
                break;
                case '/updateAccount':
                dataAccount.updateAccount(primaryAttribute,editAttribute,primaryVal,editVal).then(function(result){
                    data=JSON.stringify(result);
                    console.log(data);
                })
                break;
                case '/updateHinh':
                dataHinh.updateHinh(primaryAttribute,editAttribute,primaryVal,editVal).then(function(result){
                    data=JSON.stringify(result);
                    console.log(data);
                })
                break;
                case '/updateKhachHang':
                dataKhachHang.updateKhacHang(primaryAttribute,editAttribute,primaryVal,editVal).then(function(result){
                    data=JSON.stringify(result);
                    console.log(data);
                })
                break;
                case '/updateNhaSanXuat':
                dataNhaSX.updateNhaSanXuat(primaryAttribute,editAttribute,primaryVal,editVal).then(function(result){
                    data=JSON.stringify(result);
                    console.log(data);
                })
                break;
                case '/updateThongSoKyThuat':
                dataThongSoKyThuat.updateThongSokyThuat(primaryAttribute,editAttribute,primaryVal,editVal).then(function(result){
                    data=JSON.stringify(result);
                    console.log(data);
                })
                break; 
                default:
                {
                    res.writeHeader(200, {'Content-Type': 'text/plain'});
                    res.end("DataService not implement!!");
                }
            }
        }
        break; 
        case 'PUT':
            break;
        case 'DELETE':
            break;
    }
    
}).listen(port, (err) => {
    if(err != null)
        console.log('==> Error: ' + err);
    else
        console.log('Server is starting at port ' + port);
});
