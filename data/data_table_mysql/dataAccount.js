const db = require("../dao_mysql/connection_mysql");
const common_handle_data= require("./core_data_table_mysql//common_handle_data");
const q = require("q");

var connection = db.getConnection();

function getAllAccount(){
    var sql = `SELECT * FROM account`;
    return common_handle_data.getAllInfo(sql);
}

function updateAccount(primaryAttribute,editAttribute,primaryVal,editVal){
    var sql= "UPDATE account SET "+editAttribute+ "='"+editVal+  "' WHERE "+primaryAttribute+" ='"+primaryVal+"'";
    console.log(sql);
    return common_handle_data.updateInfo(sql);
}

module.exports = {
  getAllAccount : getAllAccount,
  updateAccount : updateAccount
}