const model = require("../models/index");
const companyModel = model.company;
const responseService = require('../config/responceservice');
const constant = require('../config/constant');



module.exports = {
    /**
    * Create bank Account
    * 
    * @author Hitesh Shingala
    * @param  AccountData object
    * @return object
    * 
    */
    createCompany: function (req, res) {
        return new Promise((resolve, reject) => {
            if (req.body) {
                if (req.userData && req.userData.id) {
                    let companyDetail = {};
                    companyDetail.userId = req.userData.id;
                    companyDetail.name = req.body.name ? req.body.name : '';
                    companyDetail.companyInfo = req.body.companyInfo ? req.body.companyInfo : '';
                    companyDetail.subsidary = req.body.subsidary ? req.body.subsidary : '';
                    companyDetail.parent = req.body.parent ? req.body.parent : '';
                    companyDetail.costCode = req.body.costCode ? req.body.costCode : '';
                    companyDetail.paySetup = req.body.paySetup ? req.body.paySetup : '';
                    companyDetail.payUsingParent = req.body.payUsingParent ? req.body.payUsingParent : '';
                    companyDetail.verified = false;
                    companyDetail.isDeleted = false;
                    companyModel.create(companyDetail).then(async function (company) {
                        try {
                            if (company) {
                                const respose = await responseService.sucess({ msg: constant.ACCOUNT_CREATED, payload: company })
                                resolve(respose);
                            }
                        } catch (e) {
                            const respose = await responseService.error({ msg: e })
                            resolve(respose);
                        }
                    })
                }
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
    updateCompany: function (req, res) {
        return new Promise(async (resolve, reject) => {
            if (req.body && req.body.id) {
                let where = {
                };
                if(req.userData.role !== 'ADMIN'){
                    where.userId =  req.userData.id
                }
                where.id = req.body.id;
                companyModel.findOne({ where: where }).then(async function (companyDetail) {
                    if (companyDetail) {
                        companyDetail.name = req.body.name ? req.body.name : companyDetail.name;
                        companyDetail.companyInfo = req.body.companyInfo ? req.body.companyInfo : companyDetail.companyInfo;
                        companyDetail.subsidary = req.body.subsidary ? req.body.subsidary : companyDetail.subsidary;
                        companyDetail.parent = req.body.parent ? req.body.parent : companyDetail.parent;
                        companyDetail.costCode = req.body.costCode ? req.body.costCode : companyDetail.costCode;
                        companyDetail.paySetup = req.body.paySetup ? req.body.paySetup : companyDetail.paySetup;
                        companyDetail.payUsingParent = req.body.payUsingParent ? req.body.payUsingParent : companyDetail.payUsingParent;
                        companyDetail.save().then(async data => {
                            res.status(200)
                            const response = await responseService.sucess({ msg: constant.COMPANY_UPDATE_SUCCESS, payload: data })
                            resolve(response)
                        })
                    } else {
                        const response = await responseService.error({ msg: constant.COMPANY_NOT_FOUND })
                        resolve(response)
                    }
                })
            } else {
                const respose = await responseService.error({ msg: constant.COMPANY_NOT_FOUND })
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
    getCompany: function (userId, userData) {
        return new Promise(async (resolve, reject) => {
            let where = {
                isDeleted: false
            };
            if(userData.role !== 'ADMIN'){
                where.userId =  userData.id
            }
            where.id = userId;
            if (userId) {
                const company = await companyModel.findOne({ where: where });
                if(company){
                    const response = await responseService.sucess({ msg: constant.COMPANY_GET_SUCCESS, payload: company })
                    resolve(response)
                } else {
                    const respose = await responseService.error({ msg: constant.COMPANY_NOT_FOUND })
                    resolve(respose)
                }
            } else {
                const respose = await responseService.error({ msg: constant.COMPANY_NOT_FOUND })
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
    deleteCompany: function (userId, userData) {
        return new Promise(async (resolve, reject) => {
            let where = {
                isDeleted: false
            };
            if(userData.role !== 'ADMIN'){
                where.userId =  userData.id
            }
            where.id = userId;
            try {
                if (userId) {
                    const company = await companyModel.findOne({ where: where });
                    company.isDeleted = true;
                    company.save();
                    const response = await responseService.sucess({ msg: constant.COMPANY_DELETE_SUCCESS, payload: { id: company.id } })
                    resolve(response)
                } else {
                    const respose = await responseService.error({ msg: constant.COMPANY_NOT_FOUND })
                    resolve(respose)
                }
            } catch (e) {
                const respose = await responseService.error({ msg: e })
                resolve(respose)
            }
        })
    }

}