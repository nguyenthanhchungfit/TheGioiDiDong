const db = require("../dao_mysql/connection_mysql");
const common_handle_data= require("./core_data_table_mysql//common_handle_data");
const q = require("q");

var connection = db.getConnection();

function getAllHinh(){
    var sql = `SELECT * FROM hinh`;
    return common_handle_data.getAllInfo(sql);
}
function updateHinh(primaryAttribute,editAttribute,primaryVal,editVal){
    var sql= "UPDATE hinh SET"+editAttribute+ "="+editVal+  "WHERE "+primaryAttribute+" ="+primaryVal;
    return common_handle_data.updateInfo(sql);
}
module.exports = {
  getAllHinh : getAllHinh,
  updateHinh : updateHinh
}