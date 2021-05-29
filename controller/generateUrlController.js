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
    addURLData: function ({groupName, groupImg, userUniqId, urlType, userName, sharingUrl}, res) {
        return new Promise( async(resolve, reject) => {
            if (groupName && groupImg && userUniqId) {
                    let generateUrl = {};
                    generateUrl.groupName = groupName ;
                    generateUrl.groupImg = groupImg;
                    generateUrl.userUniqId = userUniqId;
                    generateUrl.userName = userName;
                    generateUrl.sharingUrl = sharingUrl;
                    generateUrl.urlType = urlType;
                     try {
                        generateURLsModel.create(generateUrl).then(async function ( urlData) {
                            try {
                                if (urlData) {
                                    const url = generateURL(urlType, urlData.id)
                                    const respose = await responseService.sucess({ msg: constant.DATA_SAVED, payload: {...urlData.dataValues, url: url} })
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

    getUrlData: function({id}, res) {
        return new Promise(async(resolve, reject) => {
            if(id) {
                const data = await generateURLsModel.findOne({where: {id: id}});
                if (data) {
                    data.groupImg = constant.WP_BASE_URL + data.groupImg
                    const respose = await responseService.sucess({ msg: constant.DATA_SAVED, payload: data })
                    resolve(respose);
                }
                else {
                    const respose = await responseService.error({ msg: constant.URL_NOT_FOUND })
                    reject(respose);
                }
            } else {
                const respose = await responseService.error({ msg: constant.URL_NOT_FOUND })
                reject(respose);
            }
        })
    }
    
    
}
function generateURL(platformType, urlIds){
    switch(platformType) {
        case constant.WHATSAPP:
            return `${process.env.BASE_URL || constant.WP_BASE_URL}/whatsapplink/${urlIds}`
        case constant.TELEGRAM:
            return `${process.env.BASE_URL || constant.TELEGRAM_BASE_URL}/telegramlink/${urlIds}`
        case constant.NEARYOU:
            return `${process.env.BASE_URL || constant.NEAR_YOU_BASE_URL}/nearyoulink/${urlIds}`
        case constant.GDRIVE:
            return `${process.env.BASE_URL || constant.GOOGLE_BASE_URL}/gdrivelink/${urlIds}`
        default:
            return `${process.env.BASE_URL || constant.WP_BASE_URL}/whatsapplink/${urlIds}`
    }
}