var duong_dan_module_DL_mysql= '../data_table_mysql/';
const dataTablet = require(duong_dan_module_DL_mysql+"dataTablet");


function getAllTabletForHome(req, res, responseHeader){
    dataTablet.getAllTabletForHome().then(function(result){
        data = JSON.stringify(result);
        res.writeHeader(200, responseHeader);
        res.end(data);
    });
}

function getAllTabletForAD(req, res, responseHeader){
    dataTablet.getAllTablet().then(function(result){
        data = JSON.stringify(result);
        res.writeHeader(200, responseHeader);
        res.end(data);
    });
}


module.exports = {
    getAllTabletForHome : getAllTabletForHome,
    getAllTabletForAD : getAllTabletForAD
}