const fs = require('fs');

var account_data = JSON.parse(fs.readFileSync(__dirname + '/server_connection_acc.json', 'utf8'));

function isExistedAccount(username, password){
    for(x in account_data){
        if(username === account_data[x].username && password === account_data[x].password){
            return true;
        }
    }
    return false;
}


module.exports = {
    isExistedAccount : isExistedAccount
}