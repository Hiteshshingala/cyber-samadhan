var express = require('express');
var router = express.Router();
const addressController = require('../controller/addressController')
const AuthToken = require('./../middleware/auth')

router.post('/', AuthToken, async function(req, res){
    let data = await addressController.addAddress(req, res);
    res.send(data)
})
router.put('/', AuthToken, async function(req, res){
    let data = await addressController.updateAddress(req, res);
    res.send(data)
})
router.get('/:id', AuthToken, async function(req, res){
    const id = req.params.id;
    let data = await addressController.getAddress(id, req.userData);
    res.send(data)
})
router.delete('/:id', AuthToken, async function(req, res){
    const id = req.params.id;
    let data = await addressController.deleteAddress(id, req.userData);
    res.send(data)
})

module.exports = router;
