const db = require("../dao_mysql/connection_mysql");
const q = require("q");

var connection = db.getConnection();

function getAllLaptop(){
    var sql = `SELECT * FROM laptop`;
    var defer = q.defer();
    var query = connection.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        defer.resolve(result);
    });
    return defer.promise;
}
function getThongSoKyThuat(laptop)
{
    var sql = 'SELECT * FROM thong_so_ky_thuat WHERE ma_thiet_bi=$[laptop[0].ma_thiet_bi]'
    var defer = q.defer();
    var query = connection.query(sql, function(err, result, fields){
        if(err) defer.reject(err);
        defer.resolve(result);
    });
    return defer.promise;
}
module.exports = {
  getAllLaptop : getAllLaptop,
  getThongSoKyThuat : getThongSoKyThuat
}