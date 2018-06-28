var duong_dan_module_DL_mysql= '../data_table_mysql/';
const dataMobile = require(duong_dan_module_DL_mysql+"dataMobile");
const query = require('querystring');
const app = require('http');
var File = require("fs");
const server_accounts_manager = require('../server_connection/server_accounts_manager');
const dataAccount = require('../data_table_mysql/dataAccount');
const Duong_Dan_XML = __dirname  + "/../danh_sach_ban_hang/danh_sach_ban_hang.xml"

var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;

function LuuTruDonHang(req, res, responseHeader, session_manager){
    var data = '';
    req.on('data', function (chunk) {
        data += chunk;
    });
    req.on('end', function () {

        console.log(data);
        res.writeHeader(200, responseHeader);
        var objData = JSON.parse(data);
        res.end(JSON.stringify({"a": "x"}));
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

function GetDuLieuXML(){
    var content = File.readFileSync(Duong_Dan_XML, "utf-8");
    var Du_lieu = new DOMParser().parseFromString(content, "text/xml").documentElement;
    return Du_lieu;
}

function GhiDuLieuXML(orders){
    console.log(orders);
    // var Du_lieu = GetDuLieuXML();
    // var doc = new DOMParser().parseFromString("<Du_lieu> </Du_lieu>", "text/xml");
    // var nodeNhap = doc.createElement("Ban_hang");
    // nodeNhap.setAttribute("nguoi_mua", orders.ten_nguoi_mua);
    // nodeNhap.setAttribute("dia_chi", orders.dia_chi);
    // nodeNhap.setAttribute("so_dien_thoai", orders.so_dien_thoai);
    // nodeNhap.setAttribute("tong_tien", orders.tong_tien);
    // var nodeDanhSachSanPham = doc.createElement("Danh_sach_San_pham");
    // var products = orders.products;
    // for(var i = 0; i<products.length; i++){
    //     var SanPham = products[i];
    //     var nodeSanPham = doc.createAttribute("San_pham");
    //     nodeSanPham.setAttribute("name", SanPham.name);
    //     nodeSanPham.setAttribute("slt", SanPham.slt);
    //     nodeSanPham.setAttribute("slm", SanPham.slm);
    //     nodeSanPham.setAttribute("don_gia", SanPham.don_gia);
    //     nodeDanhSachSanPham.appendChild(nodeSanPham);
    // }
    // nodeNhap.appendChild(nodeDanhSachSanPham);
    // Du_lieu.getElementsByTagName("Danh_sach_Ban_hang")[0].appendChild(nodeNhap);
    // File.writeFile(Duong_Dan_XML, Du_lieu, function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("Save :" + path + " success!");
    // });
}

module.exports = {
    LuuTruDonHang : LuuTruDonHang,
    
}

function LuuDuLieu(orders){

}