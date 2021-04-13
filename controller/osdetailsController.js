const model = require("../models/index");
const osdetailsModel = model.osdetails;
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
                     try {
                        osdetailsModel.create(osDetail).then(async function (account) {
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
                    }               
            }
        })
    }
}