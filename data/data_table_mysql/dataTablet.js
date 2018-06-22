const db = require("../dao_mysql/connection_mysql");
const common_handle_data= require("./core_data_table_mysql//common_handle_data");
const q = require("q");

var connection = db.getConnection();

function getAllTablet(){
    var sql = `SELECT * FROM tablet`;
   return common_handle_data.getAllTablet(sql);
}
function updateTablet(primaryAttribute,editAttribute,primaryVal,editVal){
  var sql= "UPDATE tablet SET "+editAttribute+ "='"+editVal+  "' WHERE "+primaryAttribute+" ='"+primaryVal+"'";
  return common_handle_data.updateInfo(sql);
}
module.exports = {
  getAllTablet : getAllTablet,
  updateTablet : updateTablet
}