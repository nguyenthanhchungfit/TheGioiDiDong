const db = require("../dao_mysql/connection_mysql");
const common_handle_data= require("./core_data_table_mysql//common_handle_data");
const q = require("q");

var connection = db.getConnection();

function getAllMobile(){
    var sql = `SELECT * FROM dien_thoai`;
    return common_handle_data.getAllInfo(sql);
}

function getAllMobileForHome(){
    var sql = `SELECT DISTINCT dt.ma_dien_thoai, dt.ten_dien_thoai, dt.gia, dt.so_luong_ton ,h.ma_hinh from dien_thoai as dt 
    JOIN hinh as h
    ON dt.ma_thiet_bi = h.ma_thiet_bi AND dt.so_luong_ton > 0 AND dt.duoc_ban = true
    GROUP BY dt.ma_dien_thoai;`
    return common_handle_data.getAllInfo(sql);
}

function updateMobile(primaryAttribute,editAttribute,primaryVal,editVal){
    var sql= "UPDATE mobile SET "+editAttribute+ "='"+editVal+  "' WHERE "+primaryAttribute+" ='"+primaryVal+"'";
    return common_handle_data.updateInfo(sql);
} 



module.exports = {
  getAllMobile : getAllMobile,
  getAllMobileForHome : getAllMobileForHome,
  updateMobile : updateMobile
}