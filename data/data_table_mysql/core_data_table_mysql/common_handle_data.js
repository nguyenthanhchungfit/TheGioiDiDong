const db = require("../../dao_mysql/connection_mysql");
const q = require("q");

var connection = db.getConnection();

// lấy tất cả thông tin của một bảng
function getAllInfo(str_sql){
    var defer = q.defer();
    var query = connection.query(str_sql, function(err, result, fields){
        if(err) defer.reject(err);
        defer.resolve(result);
    });
    return defer.promise;
}

// update thông tin của bảng
function updateInfo(str_sql)
{
    var defer =q.defer();
    var query = connection.query(str_sql, function(err,result,fields){
        if(err) defer.reject(err);
        defer.resolve(result);
    })
    return defer.promise;
}
module.exports = {
  getAllInfo : getAllInfo,
  updateInfo : updateInfo
}