const model = require("../models/index");
const roleModel = model.roles;
const responseService = require('../config/responceservice');
const constant = require('../config/constant');



module.exports = {

    /**
    * Get All roles
    * 
    * @author Hitesh Shingala
    * @param   object
    * @return object
    * 
    */
    getRoles: function (req, res) {
        return new Promise(async (resolve, reject) => {
            const role = await roleModel.findAll();
            const response = await responseService.sucess({ msg: constant.ROLE_GET_SUCCESS, payload: role })
            resolve(response)
        })
    },


}