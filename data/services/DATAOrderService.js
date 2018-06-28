var duong_dan_module_DL_mysql = '../data_table_mysql/';

const dataMobile = require(duong_dan_module_DL_mysql + "dataMobile");
const dataLaptop = require(duong_dan_module_DL_mysql + "dataLaptop");
const dataTablet = require(duong_dan_module_DL_mysql + "dataTablet");

const query = require('querystring');
const app = require('http');
var fs = require("fs");
const server_accounts_manager = require('../server_connection/server_accounts_manager');
const dataAccount = require('../data_table_mysql/dataAccount');
const Duong_Dan_XML = __dirname + "/../danh_sach_ban_hang/danh_sach_ban_hang.xml"
const Duong_Dan_JSON = __dirname + "/../danh_sach_ban_hang/danh_sach_ban_hang.json"

var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;

function LuuTruDonHang(req, res, responseHeader, session_manager) {
    var data = '';
    req.on('data', function (chunk) {
        data += chunk;
    });
    req.on('end', function () {

        res.writeHeader(200, responseHeader);
        var objData = JSON.parse(data);
        var order = objData.orders;
        var products = order.products;
        console.log(order);
        console.log(products);

        // Xử lý dữ liệu json
        try {
            var du_lieu = JSON.parse(fs.readFileSync(Duong_Dan_JSON, 'utf8'));
            du_lieu.Danh_sach_Ban_hang.push(order);
            console.log(du_lieu);
            fs.writeFileSync(Duong_Dan_JSON, JSON.stringify(du_lieu), "utf8");

        } catch (err) {
            console.log(err);
        }

        for (var i = 0; i < products.length; i++) {
            var product = products[i];
            var id = product.id;
            var so_luong_ton = product.slt - product.slm;;
            console.log('id: ', id);
            console.log('so_luong_ton: ', so_luong_ton);
            //cập nhật dữ liệu DB;
            if (id.search("DT") != -1) {
                dataMobile.updateMobile("ma_dien_thoai", "so_luong_ton", id, so_luong_ton);
            } else if (id.search("LT") != -1) {
                dataLaptop.updateDataLaptop("ma_laptop", "so_luong_ton", id, so_luong_ton);
            } else if (id.search("TL") != -1) {
                dataTablet.updateDataTablet("ma_tablet", "so_luong_ton", id, so_luong_ton);
            }
        }
        res.end(JSON.stringify({
            "success": "OK"
        }));



        //GhiDuLieuXML(objData.orders);

        // var dataRequest = query.parse(data);
        // console.log('**login server request', dataRequest);
        // var sessionID = dataRequest.sessionID;


        // if(sessionID){
        //     var indexSession = session_manager.isExistedKey(sessionID);
        //     if(indexSession != -1){
        //         var sessionAccount = session_manager.getSesionAt(indexSession);
        //         console.log('sessionAccount : ', sessionAccount);
        //         // session hết hạn
        //         if(session_manager.isExpiredDate(sessionAccount.last_access, sessionAccount.time_out)){
        //             console.log(`session: ${sessionID} expired!`);
        //             res.end(JSON.stringify(session_manager.getExpiredError()));
        //         // sesion còn hạn
        //         }else{
        //             session_manager.updateNewLastAccessAt(indexSession);
        //             var username = dataRequest.username;
        //             var password = dataRequest.password;         
        //             var account = dataAccount.isExistedAccount(username, password);
        //             if(account == -1){
        //                 res.end(JSON.stringify(session_manager.getLoginError())); 
        //             }else{           
        //                 var user = {username : account.username, type : account.type}; 
        //                 res.end(JSON.stringify(user));                   
        //             }                    
        //         }
        //     }else{
        //         res.end(JSON.stringify(session_manager.getLoginError())); 
        //     }
        // }
    });
}



module.exports = {
    LuuTruDonHang: LuuTruDonHang,

}