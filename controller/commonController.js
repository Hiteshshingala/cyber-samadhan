const responseService = require('../config/responceservice');
const constant = require('../config/constant');

module.exports = {
    /**
    * Save file
    * 
    * @author Hitesh Shingala
    * @param  files object
    * @return object
    * 
    */
    uploadFile: function(req, res){
        return new Promise((resolve, reject) => {
            if(req.files && req.files[0] && req.files[0].path) {
                const response = responseService.sucess({msg: constant.FILE_SAVE_SUCESSFULLY, payload: req.files[0].filename })
                resolve(response)
            } else {
                const response = responseService.error({msg: constant.SMOTHING_WENT_WRONG })
                resolve(response)
            }
        })
    }
}