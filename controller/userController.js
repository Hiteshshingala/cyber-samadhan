const model = require("../models/index");
const validate = require('../utils/validation')
const bcrypt = require('bcryptjs');
const responseService = require('../config/responceservice');
const constant = require('../config/constant');
const userModel = model.users;

module.exports = {
    /**
    * Update User
    * 
    * @author Hitesh Shingala
    * @param  userData object
    * @return object
    * 
    */
    updateUser: function (req, res) {
        return new Promise((resolve, reject) => {
            if (req.body.email != null && req.body.email != undefined && validate.emailIsValid(req.body.email)) {
                userModel.findOne({ where: { email: req.body.email } }).then(async function (users) {
                    if (users) {
                        if (bcrypt.compareSync(req.body.password, users.password)) {
                            req.body.house ? users.house = req.body.house : users.house
                            req.body.firstName ? users.firstName = req.body.firstName : users.firstName
                            req.body.lastName ? users.lastName = req.body.lastName : users.lastName
                            req.body.street ? users.street = req.body.street : users.street
                            req.body.city ? users.city = req.body.city : users.city
                            req.body.state ? users.state = req.body.state : users.state
                            req.body.zip ? users.zip = req.body.zip : users.zip
                            users.save().then(async data => {
                                data.password = null
                                let updateresponce = {
                                    email: users.email,
                                    firstName: users.firstName,
                                    lastName: users.lastName,
                                }
                                res.status(200)
                                const response = await responseService.sucess({ msg: constant.USER_UPDATE_SUCCESS, payload: updateresponce })
                                resolve(response)
                            })
                        } else {
                            res.status(404)
                            const response = await responseService.error({ msg: constant.USER_NOT_FOUND })
                            resolve(response)
                        }
                    } else {
                        res.status(404)
                        const response = await responseService.error({ msg: constant.USER_NOT_FOUND })
                        resolve(response)
                    }
                })
            }
        })
    },
    getUsers: function (req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                let where = {
                    isDeleted: { $ne: 1 }
                };
                if (req.userData.role !== 'ADMIN') {
                    where.id = req.userData.id
                }
                const account = await userModel.findAll({ where: where });
                if (account) {
                    const response = await responseService.sucess({ msg: constant.USER_GET_SUCCESS, payload: { id: account } })
                    resolve(response)
                } else {
                    const respose = await responseService.error({ msg: constant.USER_NOT_FOUND })
                    resolve(respose)
                }

            } catch (e) {
                const respose = await responseService.error({ msg: e })
                resolve(respose)
            }
        })
    },
    getUserByID: function (req, userId) {
        return new Promise(async (resolve, reject) => {
            try {
                if (req.userData.role !== 'ADMIN') {
                    const respose = await responseService.error({ msg: constant.USER_NOT_AUTHORIZE })
                    resolve(respose)
                }
                if (userId) {
                    const account = await userModel.findOne({ where: { id: parseInt(userId), isDeleted: { $ne: 1 } } });
                    if (account) {
                        const response = await responseService.sucess({ msg: constant.USER_GET_SUCCESS, payload: { id: account } })
                        resolve(response)
                    } else {
                        const respose = await responseService.error({ msg: constant.USER_NOT_FOUND })
                        resolve(respose)
                    }
                } else {
                    const respose = await responseService.error({ msg: constant.USER_NOT_FOUND })
                    resolve(respose)
                }
            } catch (e) {
                const respose = await responseService.error({ msg: e })
                resolve(respose)
            }
        })
    },
    deleteUser: function (userId) {
        return new Promise(async (resolve, reject) => {
            try {
                if (userId) {
                    const account = await userModel.findOne({ where: { id: userId, isDeleted: false } });
                    if (account) {
                        account.isDeleted = true;
                        account.save();
                        const response = await responseService.sucess({ msg: constant.USER_DELETE_SUCCESS, payload: { id: account.id } })
                        resolve(response)
                    } else {
                        const respose = await responseService.error({ msg: constant.USER_NOT_FOUND })
                        resolve(respose)
                    }
                } else {
                    const respose = await responseService.error({ msg: constant.USER_NOT_FOUND })
                    resolve(respose)
                }
            } catch (e) {
                const respose = await responseService.error({ msg: e })
                resolve(respose)
            }
        })
    }
}