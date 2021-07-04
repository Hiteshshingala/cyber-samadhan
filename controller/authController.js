'use strict'


const model = require("../models/index");
const userModel = model.users;
const validate = require('../utils/validation')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const mailer = require('./../service/emailservice')
const responseService = require('../config/responceservice');
const constant = require('../config/constant');
const path = require('path');



module.exports = {
    /**
    * Register User
    * 
    * @author Hitesh Shingala
    * @param  UserData object
    * @return object
    * 
    */
    register: function (req, res) {
        return new Promise(async (resolve, reject) => {
            const email = req.body.email ? req.body.email : '';
            if (email && validate.emailIsValid(req.body.email)) {
                const isUserExist = await userModel.count({ where: { email: req.body.email } })
                if (isUserExist > 0) {
                    res.status(400)
                    const response = await responseService.error({ msg: constant.EMAIL_ALLREADY_EXIST })
                    return resolve(response)
                }
                if (req.body.password != null && req.body.password != undefined && validate.passwordIsValid(req.body.password)) {
                    let passwordhash = bcrypt.hashSync(req.body.password, 10)
                    const isValidUser = constant.ROLE_TYPE.includes(req.body.role ? req.body.role : '');
                    if (!isValidUser) {
                        res.status(400)
                        const response = await responseService.error({ msg: constant.USER_NOT_VALID })
                        return resolve(response)
                    }
                    userModel.create({ ...req.body, email: email, password: passwordhash, UserUniquId: Math.random().toString(36).replace('0.', ''), isDeleted: false }).then(async function (users) {
                        if (users) {
                            users.password = null;
                            let registerresponce = {
                                email: users.email
                            }
                            mailer.verifymail(users, req, res);
                            res.status(201)
                            const response = await responseService.sucess({ msg: constant.USER_REGISTER_SUCCESSFULLY, payload: registerresponce })
                            resolve(response)
                        } else {

                        }
                    })
                } else {
                    res.status(400)
                    const response = await responseService.error({ msg: constant.PLEASE_ENTER_VALID_PASSWORD })
                    resolve(response)
                }

            } else {
                res.status(400)
                const response = await responseService.error({ msg: constant.PLEASE_ENTER_VALID_EMAIL })
                resolve(response)
            }
        })

    },
    /**
    * Conform User Account 
    * 
    * @author Hitesh Shingala
    * @param  id
    * @return html file
    * 
    */
    conformmail: function (req, res) {
        return new Promise((resolve, reject) => {
            if (req.query.id) {
                userModel.findOne({ where: { id: parseInt(req.query.id), isActive: 0 } }).then(function (users) {
                    if (users) {
                        users.isActive = true
                        users.save().then(data => {
                            resolve('thanks for support us')
                        })
                    } else {
                        resolve('User already conform account')
                    }
                })
            }
            else {
                resolve('bad request')
            }
        })
    },
    /**
    * Login User 
    * 
    * @author Hitesh Shingala
    * @param  {email, password} object
    * @return object
    * 
    */
    login: function (req, res) {
        return new Promise(async(resolve, reject) => {
            if (req.body.email != null && req.body.email != undefined && validate.emailIsValid(req.body.email)) {
                if (req.body.password) {
                    userModel.findOne({ where: { email: req.body.email } }).then(async function (users) {
                        if (users) {
                            if(!users.isLogin) {
                                res.status(401)
                                const response = await responseService.error({ msg: constant.ACCOUNT_NOT_ACTIVE })
                                resolve(response)   
                            }
                            if (bcrypt.compareSync(req.body.password, users.password)) {
                                let token = jwt.sign({ email: req.body.email, id: users.id, role: users.role, userUniquId: users.UserUniquId }, constant.JWT_SECRET, { expiresIn: constant.JWT_EXPIRETIME })
                                let responceData = {
                                    token: token,
                                    Users: {
                                        firstName: users.firstName ? users.firstName : '',
                                        lastName: users.lastName ? users.lastName : '',
                                        email: users.email,
                                        role: users.role
                                    }
                                }
                                users.isLogin = true;
                                users.save();
                                users.password = null
                                res.status(200)
                                const response = await responseService.sucess({ msg: constant.USER_LOGIN_SUCCESS, payload: responceData })
                                resolve(response);
                            } else {
                                res.status(401)
                                const response = await responseService.error({ msg: constant.PLEASE_ENTER_CURRECT_PASSWORD })
                                resolve(response)
                            }
                        } else {
                            res.status(401)
                            const response = await responseService.error({ msg: constant.PLEASE_ENTER_CURRECT_PASSWORD })
                            resolve(response)
                        }
                    })
                } else {
                    res.status(401)
                    const response = await responseService.error({ msg: constant.PLEASE_ENTER_VALID_PASSWORD })
                    resolve(response)
                }
            }
        })

    },
    changepassword: function (req, res) {
        return new Promise((resolve, reject) => {
            if (req.body.email != null && req.body.email != undefined && validate.emailIsValid(req.body.email)) {
                userModel.findOne({ where: { email: req.body.email, isDeleted: false } }, async function (err, users) {
                    if (err) {
                        res.status(401)
                        resolve(err)
                    } else if (users == null || users == undefined) {
                        res.status(401)
                        const response = await responseService.error({ msg: constant.PLEASE_ENTER_CURRECT_PASSWORD })
                        resolve(response)

                    }
                    else {
                        if (bcrypt.compareSync(req.body.oldpassword, users.password)) {
                            users.password = bcrypt.hashSync(req.body.password, 10)
                            users.save().then(async data => {
                                data.password = null
                                res.status(200)
                                const response = await responseService.sucess({ msg: constant.USER_LOGIN_SUCCESS, payload: data })
                                resolve(response);
                            })
                        } else {
                            res.status(401)
                            resolve('Please Enter Valid Password')
                        }
                    }
                })
            }
        })
    },
    forgotpassword: function (req, res) {
        return new Promise(async (resolve, reject) => {
            if (req.body.Verifytoken != null && req.body.Verifytoken != undefined) {
                if (req.body.Password != null && req.body.Password != undefined && validate.passwordIsValid(req.body.Password)) {
                    userModel.findOne({ where: { Verifytoken: req.body.Verifytoken } }).then(async function (users) {
                        if (users == null || users == undefined) {
                            res.status(401)
                            const response = await responseService.error({ msg: constant.USER_NOT_FOUND })
                            resolve(response)
                        } else {
                            users.password = bcrypt.hashSync(req.body.Password, 10),
                                users.Verifytoken = Math.random().toString(36).replace('0.', '')
                            users.save()
                            res.status(200)
                            const response = await responseService.sucess({ msg: constant.PASSWORD_CHANGE_SUCCESS })
                            resolve(response);
                        }
                    })
                } else {
                    res.status(401)
                    const response = await responseService.error({ msg: constant.PLEASE_ENTER_VALID_PASSWORD })
                    resolve(response)
                }
            } else {
                res.status(401)
                const response = await responseService.error({ msg: constant.SMOTHING_WENT_WRONG })
                resolve(response)
            }
        })
    },
    forgotpasswordrequest: function (req, res) {
        return new Promise((resolve, reject) => {
            if (req.body.email != null && req.body.email != undefined && validate.emailIsValid(req.body.email)) {
                userModel.findOne({ where: { email: req.body.email } }).then(function (users) {
                    if (users == null || users == undefined) {
                        res.status(200)
                        resolve('Please check link')
                    } else {
                        mailer.forgotpasswordmail(users, `${req.protocol}://${req.headers.host}`, res)
                        res.status(200)
                        resolve('please check mail and click on link')
                    }
                })
            } else {
                res.status(401)
                resolve('please enter valid password')
            }
        })
    },

    logOut: function(req, res) {
        return new Promise((resolve, reject) => {
            if (req.userData.email != null && req.userData.email != undefined ) {
                userModel.findOne({ where: { email: req.userData.email } }).then(function (users) {
                    console.log('@@@users', users)
                    if (users == null || users == undefined) {
                        users.isLogin = false;
                        users.save().then(data => {
                            res.status(200)
                            await responseService.sucess({ msg: 'Please check link' });
                        });
                    } else {
                        res.status(401)
                        await responseService.error({ msg: 'please enter valid email' });
                    }
                })
            } else {
                res.status(401)
                await responseService.error({ msg: 'please enter valid email' });
            }
        })
    }
}