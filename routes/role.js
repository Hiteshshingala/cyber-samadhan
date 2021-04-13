var express = require('express');
var router = express.Router();
const roleController = require('../controller/roleController')
const userController = require('../controller/userController')
const accountController = require('../controller/accountController')
const path = require('path');
const AuthToken = require('./../middleware/auth')

/* GET users listing. */
router.get('/', AuthToken, async function (req, res, next) {
    const data = await roleController.getRoles(req, res)
    res.send(data);
});




module.exports = router;
