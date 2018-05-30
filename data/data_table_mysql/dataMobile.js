const db = require("../dao_mysql/connection_mysql");
const common_handle_data= require("./core_data_table_mysql//common_handle_data");
const q = require("q");

var connection = db.getConnection();

function getAllMobile(){
    var sql = `SELECT * FROM dien_thoai`;
    return common_handle_data.getAllInfo(sql);
}
function updateMobile(primaryAttribute,editAttribute,primaryVal,editVal){
    var sql= "UPDATE mobile SET"+editAttribute+ "="+editVal+  "WHERE "+primaryAttribute+" ="+primaryVal;
    return common_handle_data.updateInfo(sql);
}
module.exports = {
  getAllMobile : getAllMobile,
  updateMobile : updateMobile
}