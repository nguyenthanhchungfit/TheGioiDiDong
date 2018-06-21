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
var server_accounts_manager = require('./server_connection/server_accounts_manager');

var session_manager = new session_manager_class(10);
session_manager.loadDataFromFile();
session_manager.printConnections();


const dataLaptop = require(duong_dan_module_DL_mysql+"dataLaptop");
const dataHinh = require(duong_dan_module_DL_mysql+"dataHinh");
const dataAccount = require(duong_dan_module_DL_mysql+"dataAccount");
const dataKhachHang = require(duong_dan_module_DL_mysql+"dataKhachHang");
const dataMobile = require(duong_dan_module_DL_mysql+"dataMobile");
const dataNhaSX = require(duong_dan_module_DL_mysql+"dataNhaSX");
const dataTablet = require(duong_dan_module_DL_mysql+"dataTablet");
const dataThongSoKyThuat = require(duong_dan_module_DL_mysql+"dataThongSoKyThuat");



//Test
//Tạo server lắng nghe kết nối
app.createServer((req, res) => {
    //Lấy dữ liệu body, method POST
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        console.log(query.parse(body["text1"]));
    });
   //Tách chuỗi url khi có para
   var Chuoi_url=req.url;
   if(req.url.indexOf('?')>0){
       Chuoi_url=Chuoi_url.slice(0,req.url.indexOf('?'));
   }
    //Tách para từ url thành chuỗi json
   var Chuoi_Tham_so=req.url.slice(req.url.indexOf('?')+1);
   var Tham_so_json = query.parse(Chuoi_Tham_so);
   console.log(Chuoi_url);
   console.log(req.url);
    //Xử lí dữ liệu theo URL
    /*
    switch(Chuoi_url){
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
        case '/getAllTablet':
        data=dataTablet.getAllTablet().then(function(result){
            data=JSON.stringify(result);
            console.log(data);
        });
        break;
        case '/getAllAccount':
        dataAccount.getAllAccount().then(function(result){
            data=JSON.stringify(result);
            console.log(data);
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

        // Thứ tự truyền para "primaryAttribute,editAttribute,primaryVal,editVal"
        case '/updateLaptop':
        dataLaptop.updateLaptop().then(function(result){
            data=JSON.stringify(result);
            console.log(data);
        })
        break;
        case '/updateMobile':
        data=dataMobile.updateMobile().then(function(result){
            data=JSON.stringify(result);
            console.log(data);
        });
        break;
        case '/updateTablet':
        data=dataTablet.updateTablet().then(function(result){
            data=JSON.stringify(result);
            console.log(data);
        });
        break;
        case '/updateAccount':
        dataAccount.updateAccount().then(function(result){
            data=JSON.stringify(result);
            console.log(data);
        })
        break;
        case '/updateHinh':
        dataHinh.updateHinh().then(function(result){
            data=JSON.stringify(result);
            console.log(data);
        })
        break;
        case '/updateKhachHang':
        dataKhachHang.updateKhacHang().then(function(result){
            data=JSON.stringify(result);
            console.log(data);
        })
        break;
        case '/updateNhaSanXuat':
        dataNhaSX.updateNhaSanXuat().then(function(result){
            data=JSON.stringify(result);
            console.log(data);
        })
        break;
        case '/updateThongSoKyThuat':
        dataThongSoKyThuat.updateThongSokyThuat().then(function(result){
            data=JSON.stringify(result);
            console.log(data);
        })
        break;
    }
    */

    switch(req.method) {
        //Lấy dữ liệu
        case 'GET':
        {
            res.writeHeader(200, {'Content-Type': 'text/plain'});
            res.end(data);
            console.log(data);
            console.log('--> Done');
        }
        break;
        //Cập nhập dữ liệu
        case 'POST':
        {
            switch(req.url){
                case '/loginservice':
                {
                    var data = '';
                    req.on('data', function (chunk) {
                        data += chunk;
                    });
                    req.on('end', function () {
                        var account = query.parse(data);
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
