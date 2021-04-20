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
    addURLData: function ({groupName, groupImg, userUniqId, urlType}, res) {
        return new Promise( async(resolve, reject) => {
            if (groupName && groupImg && userUniqId) {
                    let generateUrl = {};
                    generateUrl.groupName = groupName ;
                    generateUrl.groupImg = groupImg;
                    generateUrl.userUniqId = userUniqId;
                    generateUrl.urlType = urlType;
                     try {
                        generateURLsModel.create(generateUrl).then(async function ( urlData) {
                            try {
                                if (urlData) {
                                    const url = generateURL(urlType, urlData.id)
                                    const respose = await responseService.sucess({ msg: constant.ACCOUNT_CREATED, payload: {...urlData.dataValues, url: url} })
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
                    data.groupImg = constant.IMAGE_BASE_URL + data.groupImg
                    const respose = await responseService.sucess({ msg: constant.ACCOUNT_CREATED, payload: data })
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
            return `${constant.BASE_URL}/whatsapplink/${urlIds}`
        default:
            return `${constant.BASE_URL}/whatsapplink/${urlIds}`
    }
}