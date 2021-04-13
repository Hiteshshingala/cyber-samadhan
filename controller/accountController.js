const model = require("../models/index");
const userAccountModel = model.user_bank_accounts;
const responseService = require('../config/responceservice');
const constant = require('../config/constant');
const accountValidator = require('../validation/userAccount')



module.exports = {
    /**
    * Create bank Account
    * 
    * @author Hitesh Shingala
    * @param  AccountData object
    * @return object
    * 
    */
    createAccount: function (req, res) {
        return new Promise( async(resolve, reject) => {
            if (req.body) {
                if (req.userData && req.userData.id) {
                    let userBankDetail = {};
                    if (req.userData.role === 'ADMIN' && req.body.userId) {
                        userBankDetail.userId = req.body.userId;
                    } else {
                        userBankDetail.userId = req.userData.id;
                    }
                    userBankDetail.name = req.body.name ? req.body.name : '';
                    userBankDetail.accountNumber = req.body.accountNumber ? req.body.accountNumber : '';
                    userBankDetail.routingNumber = req.body.routingNumber ? req.body.routingNumber : '';
                    userBankDetail.default = req.body.default ? req.body.default : '';
                    userBankDetail.mode = req.body.mode ? req.body.mode : '';
                    userBankDetail.city = req.body.city ? req.body.city : '';
                    userBankDetail.state = req.body.state ? req.body.state : '';
                    userBankDetail.country = req.body.country ? req.body.country : '';
                    userBankDetail.zip = req.body.zip ? req.body.zip : '';
                    userBankDetail.costCode = req.body.costCode ? req.body.costCode : '';
                    userBankDetail.type = req.body.type ? req.body.type : 'SAVINGS';
                    userBankDetail.isDeleted = false;
                    const {error, isSuccess} = await accountValidator.userAccountValidate(userBankDetail);
                    if(!isSuccess){
                        const respose = await responseService.error({ msg: error })
                        resolve(respose);
                    }
                     try {
                        userAccountModel.create(userBankDetail).then(async function (account) {
                            try {
                                if (account) {
                                    const respose = await responseService.sucess({ msg: constant.ACCOUNT_CREATED, payload: account })
                                    resolve(respose);
                                }
                            } catch (e) {
                                const respose = await responseService.error({ msg: e })
                                resolve(respose);
                            }
                        })
                        
                    } catch (e) {
                        console.log('@@@@error', e);
                        const respose = await responseService.error({ msg: e })
                        resolve(respose);
                    }                }
            }
        })
    },
    /**
    * Update bank Account
    * 
    * @author Hitesh Shingala
    * @param  AccountData object
    * @return object
    * 
    */
    updateAccount: function (req, res) {
        return new Promise(async (resolve, reject) => {
            if (req.body && req.body.id) {
                userAccountModel.findOne({ where: { id: req.body.id, isDeleted: false } }).then(async function (account) {
                    if (account) {
                        account.name = req.body.name ? req.body.name : account.name;
                        account.accountNumber = req.body.accountNumber ? req.body.accountNumber : account.accountNumber;
                        account.routingNumber = req.body.routingNumber ? req.body.routingNumber : account.routingNumber;
                        account.default = req.body.default ? req.body.default : account.default;
                        account.mode = req.body.mode ? req.body.mode : account.mode;
                        account.city = req.body.city ? req.body.city : account.city;
                        account.state = req.body.state ? req.body.state : account.state;
                        account.country = req.body.country ? req.body.country : account.country;
                        account.zip = req.body.zip ? req.body.zip : account.zip;
                        account.costCode = req.body.costCode ? req.body.costCode : account.costCode;
                        account.type = req.body.type ? req.body.type : account.type;
                        const {error, isSuccess} = await accountValidator.userAccountValidate(account);
                        if(!isSuccess){
                            const respose = await responseService.error({ msg: error })
                            resolve(respose);
                        }
                        account.save().then(async data => {
                            res.status(200)
                            const response = await responseService.sucess({ msg: constant.ACCOUNT_UPDATE_SUCCESS, payload: data })
                            resolve(response)
                        })
                    } else {
                        const response = await responseService.error({ msg: constant.ACCOUNT_NOT_FOUND })
                        resolve(response)
                    }
                })
            } else {
                const respose = await responseService.error({ msg: constant.ACCOUNT_NOT_FOUND })
                resolve(respose);
            }
        })
    },
    /**
    * Get bank Account
    * 
    * @author Hitesh Shingala
    * @param  AccountData object
    * @return object
    * 
    */
    getAccount: function (req, userId) {
        return new Promise(async (resolve, reject) => {
            if (userId) {
                if (req.userData.role !== 'ADMIN' && req.userData.id !== parseInt(userId)) {
                    const respose = await responseService.error({ msg: constant.USER_NOT_AUTHORIZE })
                    resolve(respose)
                }
                const account = await userAccountModel.findOne({ where: { userId: userId, isDeleted: false } });
                const response = await responseService.sucess({ msg: constant.ACCOUNT_GET_SUCCESS, payload: account })
                resolve(response)
            } else {
                const respose = await responseService.error({ msg: constant.ACCOUNT_NOT_FOUND })
                resolve(respose)
            }
        })
    },
    /**
    * Delete bank Account
    * 
    * @author Hitesh Shingala
    * @param  userID 
    * @return object
    * 
    */
    deleteAccount: function (userId) {
        return new Promise(async (resolve, reject) => {
            try {
                if (userId) {
                    const account = await userAccountModel.findOne({ where: { userId: userId } });
                    account.isDeleted = true;
                    account.save();
                    const response = await responseService.sucess({ msg: constant.ACCOUNT_DELETE_SUCCESS, payload: { id: account.id } })
                    resolve(response)
                } else {
                    const respose = await responseService.error({ msg: constant.ACCOUNT_NOT_FOUND })
                    resolve(respose)
                }
            } catch (e) {
                const respose = await responseService.error({ msg: e })
                resolve(respose)
            }
        })
    }

}