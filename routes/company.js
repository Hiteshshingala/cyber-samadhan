var express = require('express');
var router = express.Router();
const companyController = require('../controller/companyController')
const AuthToken = require('./../middleware/auth')

router.post('/register', AuthToken, async function(req, res){
    let data = await companyController.createCompany(req, res);
    res.send(data)
})
router.put('/', AuthToken, async function(req, res){
    let data = await companyController.updateCompany(req, res);
    res.send(data)
})
router.get('/:id', AuthToken, async function(req, res){
    const id = req.params.id;
    let data = await companyController.getCompany(id, req.userData);
    res.send(data)
})
router.delete('/:id', AuthToken, async function(req, res){
    const id = req.params.id;
    let data = await companyController.deleteCompany(id, req.userData);
    res.send(data)
})

module.exports = router;
