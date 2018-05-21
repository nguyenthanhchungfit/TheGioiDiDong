const db = require("../dao_mysql/connection_mysql");
const q = require("q");

var connection = db.getConnection();

function getAllMobile(){
    var sql = `SELECT * FROM dien_thoai`;
    var defer = q.defer();
    var query = connection.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        defer.resolve(result);
    });
    return defer.promise;
}

module.exports = {
  getAllMobile : getAllMobile
}