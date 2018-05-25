const db = require("../dao_mysql/connection_mysql");
const common_handle_data= require("./core_data_table_mysql//common_handle_data");
const q = require("q");

var connection = db.getConnection();

function getAllThongSoKyThuat(){
    var sql = `SELECT * FROM thong_so_ky_thuat`;
   return common_handle_data.getAllInfo(sql);
}
function updateThongSoKyThuat(primaryAttribute,editAttribute,primaryVal,editVal){
    var sql= "UPDATE thong_so_ky_thuat SET"+editAttribute+ "="+editVal+  "WHERE "+primaryAttribute+" ="+primaryVal;
    return common_handle_data.updateInfo(sql);
}
module.exports = {
  getAllThongSoKyThuat : getAllThongSoKyThuat,
  updateThongSoKyThuat : updateThongSoKyThuat
}