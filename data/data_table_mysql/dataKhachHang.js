const db = require("../dao_mysql/connection_mysql");
const common_handle_data= require("./core_data_table_mysql//common_handle_data");
const q = require("q");

var connection = db.getConnection();

function getAllKhachHang(){
    var sql = `SELECT * FROM khach_hang`;
    return common_handle_data.getAllInfo(sql);
}
function updateKhachHang(primaryAttribute,editAttribute,primaryVal,editVal){
    var sql= "UPDATE khach_hang SET"+editAttribute+ "="+editVal+  "WHERE "+primaryAttribute+" ="+primaryVal;
    return common_handle_data.updateInfo(sql);
}
module.exports = {
  getAllKhachHang : getAllKhachHang,
  updateKhachHang : updateKhachHang
}