var mysql = require("mysql");
var config = require("config");

var connection = mysql.createConnection({
    host : config.get("mysql.host"),
    port : config.get("mysql.port"),
    database : config.get("mysql.database"),
    user : config.get("mysql.user"),
    password : config.get("mysql.password")
});

connection.connect();

function getConnection(){
    if(!connection){
        connection.connect();
    }
    return connection;
}

module.exports = {
    getConnection : getConnection
}