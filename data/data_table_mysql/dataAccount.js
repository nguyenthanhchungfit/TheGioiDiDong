const db = require("../dao_mysql/connection_mysql");
const common_handle_data= require("./core_data_table_mysql//common_handle_data");
const q = require("q");

var connection = db.getConnection();
var dataAccountCache;


function getAllAccount(){
    var sql = `SELECT * FROM account`;
    return common_handle_data.getAllInfo(sql);
}

function updateAccount(primaryAttribute,editAttribute,primaryVal,editVal){
    var sql= "UPDATE account SET "+editAttribute+ "='"+editVal+  "' WHERE "+primaryAttribute+" ='"+primaryVal+"'";
    console.log(sql);
    return common_handle_data.updateInfo(sql);
}

function loadDataFromDatabase(){
    getAllAccount().then(function(data){
        dataAccountCache = data;
    });
}

loadDataFromDatabase();

function getDataAccount(){
    if(!dataAccountCache){
        loadDataFromDatabase();
        return dataAccountCache;
    }else{
        return dataAccountCache;
    }
}

function printDataAccountCache(){
    console.log(dataAccountCache);
}

function isExistedAccount(username, password){
    var length = dataAccountCache.length;
    for(var i = 0; i< length; i++){
        console.log(dataAccountCache[i].username);
    }
    return -1;
}

module.exports = {
  getAllAccount : getAllAccount,
  updateAccount : updateAccount,
  getDataAccount : getDataAccount,
  isExistedAccount : isExistedAccount,
  printDataAccountCache : printDataAccountCache
}