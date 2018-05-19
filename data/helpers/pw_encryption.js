var bcrypt = require("bcrypt");
var config = require("config");

function encrypt_password(password){
    var saltRounds = config.get("salt");

    var salt = bcrypt.genSaltSync(saltRounds);
    var encrypted = bcrypt.hashSync(password, salt);

    return encrypted;
}

function comparePassword(password, passwordDB){
    return bcrypt.compareSync(password, passwordDB);
}

    
module.exports = {
    encrypt_password : encrypt_password,
    comparePassword : comparePassword
}