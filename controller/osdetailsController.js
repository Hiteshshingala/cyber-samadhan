const model = require("../models/index");
const osdetailsModel = model.osdetails;
const urlsModel = model.urls;
const responseService = require('../config/responceservice');
const constant = require('../config/constant');
// const accountValidator = require('../validation/userAccount')



module.exports = {
    /**
    * Add OS details
    * 
    * @author Hitesh Shingala
    * @param  osDetails object
    * @return object
    * 
    */
    addOSDetails: function (req, res) {
        return new Promise( async(resolve, reject) => {
            if (req.body) {
                    let osDetail = {};
                 
                    osDetail.platform = req.body.Ptf ? req.body.Ptf : '';
                    osDetail.browser = req.body.Brw ? req.body.Brw : '';
                    osDetail.concurrency = req.body.Cc ? req.body.Cc : '';
                    osDetail.ram = req.body.Ram ? req.body.Ram : '';
                    osDetail.vendorWebgl = req.body.Ven ? req.body.Ven : '';
                    osDetail.Webgl = req.body.Ren ? req.body.Ren : '';
                    osDetail.screenHeight = req.body.Ht ? req.body.Ht : '';
                    osDetail.screenWidth = req.body.Wd ? req.body.Wd : '';
                    osDetail.os = req.body.Os ? req.body.Os : '';
                    osDetail.urlId = req.body.urlId ? req.body.urlId : '';
                     try {
                        osdetailsModel.create(osDetail).then(async function (account) {
                            try {
                                if (account) {
                                    const respose = await responseService.sucess({ msg: constant.DATA_SAVED, payload: account })
                                    resolve(respose);
                                }
                            } catch (e) {
                                const respose = await responseService.error({ msg: e })
                                resolve(respose);
                            }
                        })
                        
                    } catch (e) {
                        const respose = await responseService.error({ msg: e })
                        resolve(respose);
                    }               
            }
        })
    },
    addLocationDetails: function (req, res) {
        return new Promise( async(resolve, reject) => {
            if (req.body) {
                    let osDetail = {};
                 
                    osDetail.latitude = req.body.Lat ? req.body.Lat : '';
                    osDetail.longitude = req.body.Lon ? req.body.Lon : '';
                    osDetail.accuracy = req.body.Acc ? req.body.Acc : '';
                    osDetail.altitude = req.body.Alt ? req.body.Alt : '';
                    osDetail.direction = req.body.Dir ? req.body.Dir : '';
                    osDetail.speed = req.body.Spd ? req.body.Spd : '';
                    // osDetail.urlId = req.body.urlId ? req.body.urlId : '';
                     try {
                        osdetailsModel.update(osDetail, {where: {urlId: req.body.urlId}} ).then(async function (account) {
                            try {
                                if (account) {
                                    const respose = await responseService.sucess({ msg: constant.DATA_SAVED, payload: account })
                                    resolve(respose);
                                }
                            } catch (e) {
                                const respose = await responseService.error({ msg: e })
                                resolve(respose);
                            }
                        })
                        
                    } catch (e) {
                        const respose = await responseService.error({ msg: e })
                        resolve(respose);
                    }               
            }
        })
    },

    getAllOsDetails: function(req, res) {
        return new Promise(async(resolve, reject) => {
            const userData = req.userData;
            const urlData = await urlsModel.findAll({ where: {userUniqId: userData.userUniquId}, order: [["createdAt", "DESC"]]})
            let userDatas = [];
            for (const data of urlData) {
                const osDetails = await osdetailsModel.findAll({
                  where: { urlId: data.id },
                  order: [["createdAt", "DESC"]],
                });
                userDatas.push({
                    ...data.dataValues,
                    osDetails: osDetails
                })
            }
            const response = await responseService.sucess({msg: 'data success', payload: userDatas})
            resolve(response)
        })
    }
}