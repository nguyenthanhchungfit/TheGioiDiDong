function validateEmail(email){
    return /^\w+@\w+\.(com|net|org|edu|com.vn)$/.test(email);
}

function validatePhone(phone){
    return /^([0-9])+$/.test(phone);
}

module.exports = {
    validateEmail : validateEmail,
    validatePhone : validatePhone
}