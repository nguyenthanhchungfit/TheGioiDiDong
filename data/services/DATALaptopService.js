var duong_dan_module_DL_mysql= '../data_table_mysql/';
const dataLaptop = require(duong_dan_module_DL_mysql+"dataLaptop");


function getAllLaptopForHome(req, res, responseHeader){
    dataLaptop.getAllLaptopForHome().then(function(result){
        data = JSON.stringify(result);
        res.writeHeader(200, responseHeader);
        res.end(data);
    });
}

function getAllLaptopForAD(req, res, responseHeader){
    dataLaptop.getAllLaptop().then(function(result){
        data = JSON.stringify(result);
        res.writeHeader(200, responseHeader);
        res.end(data);
    });
}


module.exports = {
    getAllLaptopForHome : getAllLaptopForHome,
    getAllLaptopForAD : getAllLaptopForAD
}