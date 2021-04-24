module.exports = {
    //for config
    JWT_SECRET : process.env.JWT_SECRET || 'secret',
    JWT_EXPIRETIME : '24h',
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,


    //for urltype
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    GDRIVE: 'gdrive',
    BASE_URL: 'http://localhost:8080',
    IMAGE_BASE_URL: 'http://localhost:8080/public/images/uploads/',

    // for error message
    USER_REGISTER_SUCCESSFULLY : 'User Register successfully',
    PLEASE_ENTER_VALID_PASSWORD  : 'Please Enter Valid Password',
    PLEASE_ENTER_VALID_EMAIL : 'Please Enter Valid Email',
    PLEASE_ENTER_CURRECT_PASSWORD : 'Please Enter currect Password',
    ACCOUNT_CREATED : 'Account Created',
    ACCOUNT_UPDATE_SUCCESS : 'Account Update Success',
    ACCOUNT_NOT_FOUND : 'Account Not Found',
    ACCOUNT_GET_SUCCESS : 'Account Get Success',
    ACCOUNT_NOT_FOUND : 'Account Not Found',
    ACCOUNT_DELETE_SUCCESS : 'Account Delete Success',
    COMPANY_CREATED : 'Company Created',
    COMPANY_UPDATE_SUCCESS : 'Company Update Success',
    COMPANY_NOT_FOUND : 'Company Not Found',
    COMPANY_GET_SUCCESS : 'Company Get Success',
    COMPANY_DELETE_SUCCESS : 'Company Delete Success',
    ADDRESS_CREATED : 'Address Created',
    ADDRESS_UPDATE_SUCCESS : 'Address Update Success',
    ADDRESS_NOT_FOUND : 'Address Not Found',
    ADDRESS_GET_SUCCESS : 'Address Get Success',
    ADDRESS_NOT_FOUND : 'Address Not Found',
    ADDRESS_DELETE_SUCCESS : 'Address Delete Success',
    FILE_SAVE_SUCESSFULLY : 'File Save Sucessfully',
    SMOTHING_WENT_WRONG : 'Smothing Went Wrong',
    USER_UPDATE_SUCCESS : 'User Update Success',
    USER_NOT_FOUND : 'User Not Found',
    USER_LOGIN_SUCCESS : 'User Login Success',
    USER_GET_SUCCESS: 'User Get Success',
    AUTH_FAILED: 'Auth Failed',
    USER_DELETE_SUCCESS: 'User Delete Succces',
    USER_NOT_AUTHORIZE: 'User Not Authorize',
    ROLE_TYPE: ['ADMIN', 'BUYER', 'SELLER', 'BOTH', 'SUPPORT'],
    ACCOUNT_TYPE: ['CREDITCARD', 'DEBITCARD', 'CHECKING', 'SAVINGS', 'PAYPAL'],
    PASSWORD_CHANGE_SUCCESS: 'Password Change Successfully',
    ROle_GET_SUCCESS: 'Role Get Success',
    EMAIL_ALLREADY_EXIST: 'Email Already Exist',
    USER_NOT_VALID: 'User Not Valid',

    DATA_SAVED: 'Data Saved Successfully',

    //user not found
    URL_NOT_FOUND: 'URL not found',


}