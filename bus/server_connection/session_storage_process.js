const fs = require('fs');
const path_file = __dirname + "/server_session_store.json";
var objData;
try{
    objData = JSON.parse(fs.readFileSync(path_file, "utf8"));
}catch(err){
    objData = {};
}


function writeData(){
    fs.writeFileSync(path_file, JSON.stringify(objData), "utf8");
}

function getField(field){
    var value = objData[`${field}`];
    if(value == undefined){
        return -1;
    }
    return value;
}

function setField(field, value){
    objData[`${field}`] = value;
    writeData();
}

function printValue(){
    console.log(objData);
}

module.exports = {
    getField : getField,
    setField : setField,
    printValue : printValue
}