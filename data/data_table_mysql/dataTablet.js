const db = require("../dao_mysql/connection_mysql");
const common_handle_data= require("./core_data_table_mysql//common_handle_data");
const q = require("q");

var connection = db.getConnection();

function getAllTablet(){
    var sql = `SELECT * FROM tablet`;
   return common_handle_data.getAllTablet(sql);
}

function getAllTabletForHome(){
  var sql = `SELECT DISTINCT tl.ma_tablet, tl.ten_tablet, tl.gia, tl.so_luong_ton ,h.ma_hinh from tablet as tl 
  JOIN hinh as h
  ON tl.ma_thiet_bi = h.ma_thiet_bi AND tl.so_luong_ton > 0 AND tl.duoc_ban = true
  GROUP BY tl.ma_tablet;`
  return common_handle_data.getAllInfo(sql);
}


function updateTablet(primaryAttribute,editAttribute,primaryVal,editVal){
  var sql= "UPDATE tablet SET "+editAttribute+ "='"+editVal+  "' WHERE "+primaryAttribute+" ='"+primaryVal+"'";
  return common_handle_data.updateInfo(sql);
}
module.exports = {
  getAllTablet : getAllTablet,
  updateTablet : updateTablet,
  getAllTabletForHome : getAllTabletForHome
}