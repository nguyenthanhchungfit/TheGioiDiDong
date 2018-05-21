'use strict'
//Khao Báo Biến
var duong_dan_module_DL_mysql= './data_table_mysql//';

//module về dữ liệu mysql
const config = require("config");


//npm module 
var app = require('http');
var url = require('url');
var query = require('querystring');
var port = config.get("server.port");

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
    var data;
    console.log(`${req.method} ${req.url}`);

    //Xử lí dữ liệu theo URL
    switch(req.url){
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

    }

    switch(req.method) {
        //Lấy dữ liệu
        case 'GET':
            res.writeHeader(200, {'Content-Type': 'text/plain'});
            res.end(data);
            console.log(data);
            console.log('--> Done');
            break
        //Cập nhập dữ liệu
        case 'POST':
            res.writeHeader(200, {'Content-Type': 'text/plain'});
            res.end("Data POST!!");
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
