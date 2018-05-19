var mysql = require("mysql");

var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    database : "the_gioi_di_dong",
    user : "root",
    password : ""
});

connection.connect();

function getConnection(){
    if(!connection){
        connection.connect();
    }
    return connection;
}
/*getConnection.query("SELECT * FROM customers", function (err, result, fields) {
    console.log(result)
})*/
module.exports = {
    getConnection : getConnection
}