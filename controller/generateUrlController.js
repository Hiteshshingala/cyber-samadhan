const model = require("../models/index");
const generateURLsModel = model.urls;
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
    addURLData: function ({groupName, groupImg, userUniqId}, res) {
        return new Promise( async(resolve, reject) => {
            if (groupName && groupImg && userUniqId) {
                    let generateUrl = {};
                 
                    generateUrl.groupName = groupName ;
                    generateUrl.groupImg = groupImg;
                    generateUrl.userUniqId = userUniqId;
                    console.log('@@generateUrl', generateUrl);

                     try {
                        generateURLsModel.create(generateUrl).then(async function (err, account) {
                            if(err) {
                                console.log('@@e', err);
                                const respose = await responseService.error({ msg: err })
                                resolve(respose);
                            }
                            try {
                                if (account) {
                                    const respose = await responseService.sucess({ msg: constant.ACCOUNT_CREATED, payload: account })
                                    console.log('@@respose', respose);
                                    resolve(respose);
                                }
                            } catch (e) {
                                console.log('@@e', e);
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