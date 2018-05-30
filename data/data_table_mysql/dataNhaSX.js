const db = require("../dao_mysql/connection_mysql");
const common_handle_data= require("./core_data_table_mysql//common_handle_data");
const q = require("q");

var connection = db.getConnection();

function getAllNhaSanXuat(){
    var sql = `SELECT * FROM nha_san_xuat`;
    return common_handle_data.getAllInfo(sql);
}
function updateNhaSanXuat(primaryAttribute,editAttribute,primaryVal,editVal){
    var sql= "UPDATE nha_san_xuat SET"+editAttribute+ "="+editVal+  "WHERE "+primaryAttribute+" ="+primaryVal;
    return common_handle_data.updateInfo(sql);
}
module.exports = {
  getAllNhaSanXuat : getAllNhaSanXuat,
  updateNhaSanXuat : updateNhaSanXuat
}