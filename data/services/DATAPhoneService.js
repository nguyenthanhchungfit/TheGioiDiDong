var duong_dan_module_DL_mysql= '../data_table_mysql/';
const dataMobile = require(duong_dan_module_DL_mysql+"dataMobile");


function getAllMobileForHome(req, res, responseHeader){
    dataMobile.getAllMobileForHome().then(function(result){
        data = JSON.stringify(result);
        res.writeHeader(200, responseHeader);
        res.end(data);
    });
}


module.exports = {
    getAllMobileForHome : getAllMobileForHome
}