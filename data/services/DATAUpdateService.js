var duong_dan_module_DL_mysql= '../data_table_mysql/';
const dataMobile = require(duong_dan_module_DL_mysql+"dataMobile");
const query = require('querystring');
const app = require('http');
const server_accounts_manager = require('../server_connection/server_accounts_manager');
const dataAccount = require('../data_table_mysql/dataAccount');
const updateMobile = require('../data_table_mysql/dataMobile');
const updateLaptop = require('../data_table_mysql/dataLaptop');
const updateTablet = require('../data_table_mysql/dataTablet');

function update(req, res, responseHeader, session_manager){
    var data = '';
    req.on('data', function (chunk) {
        data += chunk;
    });
    req.on('end', function () {
        var tempData = query.parse(data);
        console.log('data get ở data', tempData);
        if(tempData.proId.search('DT')!=-1)
       //updateMobile.updateMobile("ma_dien_thoai","so_luong_ton",tempData.proId,tempData.soluong);
      {
      updateMobile.updateMobile("ma_dien_thoai","so_luong_ton",tempData.proId,tempData.soluong);
      updateMobile.updateMobile("ma_dien_thoai","gia",tempData.proId,tempData.gia);
      updateMobile.updateMobile("ma_dien_thoai","duoc_ban",tempData.proId,tempData.duoc_ban);
    } 
    if(tempData.proId.search('LT')!=-1){
        updateLaptop.updateLaptop("ma_laptop","so_luong_ton",tempData.proId,tempData.soluong);
        updateLaptop.updateLaptop("ma_laptop","gia",tempData.proId,tempData.gia);
        updateLaptop.updateLaptop("ma_laptop","duoc_ban",tempData.proId,tempData.duoc_ban);
    }
   
    if(tempData.proId.search('TL')!=-1)
    {
        updateTablet.updateTablet("ma_tablet","so_luong_ton",tempData.proId,tempData.soluong);
        updateTablet.updateTablet("ma_tablet","gia",tempData.proId,tempData.gia);
        updateTablet.updateTablet("ma_tablet","duoc_ban",tempData.proId,tempData.duoc_ban);
    }
    });
}

function dataUpdateLaptop(req, res, responseHeader, session_manager){
    var data = '';
    req.on('data', function (chunk) {
        data += chunk;
    });
    req.on('end', function () {
        var tempData = query.parse(data);
        console.log('data get ở data', tempData);
       //updateMobile.updateMobile("ma_dien_thoai","so_luong_ton",tempData.proId,tempData.soluong);
       updateLaptop.updateLaptop("ma_laptop","so_luong_ton",'DT001','100');
       updateLaptop.updateLaptop("ma_laptop","so_luong_ton",'DT001','100');
       updateLaptop.updateLaptop("ma_laptop","so_luong_ton",'DT001','100');
       
    });
}

function dataUpdateTablet(req, res, responseHeader, session_manager){
    var data = '';
    req.on('data', function (chunk) {
        data += chunk;
    });
    req.on('end', function () {
        var tempData = query.parse(data);
        console.log('data get ở data', tempData);
       //updateMobile.updateMobile("ma_dien_thoai","so_luong_ton",tempData.proId,tempData.soluong);
       updateTablet.updateTablet("ma_tablet","so_luong_ton",'DT001','100');
       updateTablet.updateTablet("ma_tablet","so_luong_ton",'DT001','100');
       updateTablet.updateTablet("ma_tablet","so_luong_ton",'DT001','100');
       
    });
}



module.exports = {
    update:update
}