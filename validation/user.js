var validator = require('validator'); // for more validation uset it 
const constant = require('../config/constant')

module.exports = {
    userAccountValidate: function (userAccount) {
        let error = [];
        let isSuccess = true;
        userAccount.name ? userAccount.name : error.push(constant.PLEASE_ENETER_NAME) 
        userAccount.accountNumber ? userAccount.accountNumber : error.push(constant.PLEASE_ENETER_ACCOUNTNO) 
        userAccount.routingNumber ? userAccount.routingNumber : error.push(constant.PLEASE_ENETER_ROUTINGNO) 
        userAccount.default ? userAccount.default : error.push(constant.PLEASE_ENETER_DEFAULT) 
        userAccount.mode ? userAccount.mode : error.push(constant.PLEASE_ENETER_MODE) 
        userAccount.city ? userAccount.city : error.push(constant.PLEASE_ENETER_CITY) 
        userAccount.state ? userAccount.state : error.push(constant.PLEASE_ENETER_STATE) 
        userAccount.country ? userAccount.country : error.push(constant.PLEASE_ENETER_COUNTRY) 
        userAccount.zip ? userAccount.zip : error.push(constant.PLEASE_ENETER_ZIP) 
        userAccount.costCode ? userAccount.costCode : error.push(constant.PLEASE_ENETER_COASTCODE) 
        if(error.length > 0){
            isSuccess = false
        }
        return {
            error: error,
            isSuccess: isSuccess
        }
    }
}