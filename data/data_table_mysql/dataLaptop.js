const db = require("../dao_mysql/connection_mysql");
const common_handle_data= require("./core_data_table_mysql//common_handle_data");
const q = require("q");

var connection = db.getConnection();

function getAllLaptop(){
    var sql = `SELECT * FROM laptop`;
    return common_handle_data.getAllInfo(sql);
}

function getAllLaptopForHome(){
    var sql = `SELECT DISTINCT lt.ma_laptop, lt.ten_laptop, lt.gia, lt.so_luong_ton ,h.ma_hinh from laptop as lt 
    JOIN hinh as h
    ON lt.ma_thiet_bi = h.ma_thiet_bi AND lt.so_luong_ton > 0 AND lt.duoc_ban = true
    GROUP BY lt.ma_laptop;`
    return common_handle_data.getAllInfo(sql);
}


function updateLaptop(primaryAttribute,editAttribute,primaryVal,editVal){
    var sql= "UPDATE laptop SET "+editAttribute+ "='"+editVal+  "' WHERE "+primaryAttribute+" ='"+primaryVal+"'";
    return common_handle_data.updateInfo(sql);
}
module.exports = {
  getAllLaptop : getAllLaptop,
  getAllLaptopForHome : getAllLaptopForHome,
  updateLaptop : updateLaptop
}