const model = require("../models/index");
const addressModel = model.address;
const responseService = require('../config/responceservice');
const constant = require('../config/constant');



module.exports = {
    /**
    * Create bank address
    * 
    * @author Hitesh Shingala
    * @param  ADDRESSData object
    * @return object
    * 
    */
    addAddress: function (req, res) {
        return new Promise((resolve, reject) => {
            if (req.body) {
                if (req.userData && req.userData.id) {
                    let addressDetail = {};
                    addressDetail.userId = req.userData.id;
                    addressDetail.house = req.body.house ? req.body.house : '';
                    addressDetail.suite = req.body.suite ? req.body.suite : '';
                    addressDetail.street = req.body.street ? req.body.street : '';
                    addressDetail.city = req.body.city ? req.body.city : '';
                    addressDetail.state = req.body.state ? req.body.state : '';
                    addressDetail.country = req.body.country ? req.body.country : '';
                    addressDetail.comType = req.body.comType ? req.body.comType : '';
                    addressDetail.addressType = req.body.addressType ? req.body.addressType : '';
                    addressDetail.useType = req.body.useType ? req.body.useType : '';
                    addressDetail.useTypeDefault = req.body.useTypeDefault ? req.body.useTypeDefault : '';
                    addressDetail.verifiedBy = req.body.verifiedBy ? req.body.verifiedBy : '';
                    addressDetail.costCode = req.body.costCode ? req.body.costCode : '';
                    addressDetail.zip = req.body.zip ? req.body.zip : '';
                    addressDetail.isDeleted = false;
                    addressModel.create(addressDetail).then(async function (address) {
                        try {
                            if (address) {
                                const respose = await responseService.sucess({ msg: constant.ADDRESS_CREATED, payload: address })
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
    * Update bank address
    * 
    * @author Hitesh Shingala
    * @param  ADDRESSData object
    * @return object
    * 
    */
    updateAddress: function (req, res) {
        return new Promise(async (resolve, reject) => {
            if (req.body && req.body.id) {
                let where = {
                };
                if (req.userData.role !== 'ADMIN') {
                    where.userId = req.userData.id
                }
                where.id = req.body.id;
                addressModel.findOne({ where: where }).then(async function (addressDetail) {
                    if (addressDetail) {
                        addressDetail.house = req.body.house ? req.body.house : addressDetail.house;
                        addressDetail.suite = req.body.suite ? req.body.suite : addressDetail.suite;
                        addressDetail.street = req.body.street ? req.body.street : addressDetail.street;
                        addressDetail.city = req.body.city ? req.body.city : addressDetail.city;
                        addressDetail.state = req.body.state ? req.body.state : addressDetail.state;
                        addressDetail.country = req.body.country ? req.body.country : addressDetail.country;
                        addressDetail.comType = req.body.comType ? req.body.comType : addressDetail.comType;
                        addressDetail.addressType = req.body.addressType ? req.body.addressType : addressDetail.addressType;
                        addressDetail.useType = req.body.useType ? req.body.useType : addressDetail.useType;
                        addressDetail.useTypeDefault = req.body.useTypeDefault ? req.body.useTypeDefault : addressDetail.useTypeDefault;
                        addressDetail.costCode = req.body.costCode ? req.body.costCode : addressDetail.costCode;
                        addressDetail.zip = req.body.zip ? req.body.zip : addressDetail.zip;
                        addressDetail.save().then(async data => {
                            res.status(200)
                            const response = await responseService.sucess({ msg: constant.ADDRESS_UPDATE_SUCCESS, payload: data })
                            resolve(response)
                        })
                    } else {
                        const response = await responseService.error({ msg: constant.ADDRESS_NOT_FOUND })
                        resolve(response)
                    }
                })
            } else {
                const respose = await responseService.error({ msg: constant.ADDRESS_NOT_FOUND })
                resolve(respose);
            }
        })
    },
    /**
    * Get bank address
    * 
    * @author Hitesh Shingala
    * @param  ADDRESSData object
    * @return object
    * 
    */
    getAddress: function (userId, userData) {
        return new Promise(async (resolve, reject) => {
            let where = {
                isDeleted: false
            };
            if (userData.role !== 'ADMIN') {
                where.userId = userData.id
            }
            where.id = parseInt(userId);
            if (userId) {
                const address = await addressModel.findOne({ where: where });
                if (address) {
                    const response = await responseService.sucess({ msg: constant.ADDRESS_GET_SUCCESS, payload: address })
                    resolve(response)
                } else {
                    const respose = await responseService.error({ msg: constant.ADDRESS_NOT_FOUND })
                    resolve(respose)
                }
            } else {
                const respose = await responseService.error({ msg: constant.ADDRESS_NOT_FOUND })
                resolve(respose)
            }
        })
    },
    /**
    * Delete bank address
    * 
    * @author Hitesh Shingala
    * @param  userID 
    * @return object
    * 
    */
    deleteAddress: function (userId, userData) {
        return new Promise(async (resolve, reject) => {
            let where = {
                isDeleted: false
            };
            if (userData.role !== 'ADMIN') {
                where.userId = userData.id
            }
            where.id = userId;
            try {
                if (userId) {
                    const address = await addressModel.findOne({ where: where });
                    address.isDeleted = true;
                    address.save();
                    const response = await responseService.sucess({ msg: constant.ADDRESS_DELETE_SUCCESS, payload: { id: address.id } })
                    resolve(response)
                } else {
                    const respose = await responseService.error({ msg: constant.ADDRESS_NOT_FOUND })
                    resolve(respose)
                }
            } catch (e) {
                const respose = await responseService.error({ msg: e })
                resolve(respose)
            }
        })
    }

}